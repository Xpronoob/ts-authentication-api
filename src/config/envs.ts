import dotenv from 'dotenv'

dotenv.config()

export const getPort = (): number => {
  const port = process.env.PORT
  if (!port) {
    throw new Error('PORT is not defined in the environment variables')
  }
  const num = Number.parseInt(port, 10)
  if (isNaN(num)) {
    throw new Error(`PORT is not a valid number: ${port}`)
  }
  return num
}

export const getFrontendUrl = (): string => {
  const frontUrl = process.env.FRONTEND_URL
  return frontUrl || 'http://localhost:5173'
}

interface DBConnection {
  url: string
  dbName: string
}

export class MongoConnection implements DBConnection {
  url: string
  dbName: string

  constructor() {
    this.url = process.env.MONGO_URL || ''
    this.dbName = process.env.MONGO_DB_NAME || ''
    this.validateConnectionInfo()
  }

  private validateConnectionInfo(): void {
    if (!this.url) {
      throw new Error('MONGO_URL is not defined in the environment variables')
    }

    if (!this.dbName) {
      throw new Error('MONGO_DB_NAME is not defined in the environment variables')
    }
  }

  getMongoInfo(): { url: string; dbName: string } {
    this.validateConnectionInfo()
    return { url: this.url, dbName: this.dbName }
  }
}

// export const getMongo = (): DBConnection => {
//   const url = process.env.MONGO_URL || ''
//   const dbName = process.env.MONGO_DB_NAME || ''
//   if (!url) {
//     throw new Error('MONGO_URL is not defined in the environment variables')
//   }
//   if (!dbName) {
//     throw new Error('MONGO_DB_NAME is not defined in the environment variables')
//   }
//   return { url, dbName }
// }

const dbInstance = new MongoConnection()

const { url, dbName } = dbInstance.getMongoInfo()

export const envs = {
  FRONTEND_URL: getFrontendUrl(),

  PORT: getPort(),
  MONGO_URL: url,
  MONGO_DB_NAME: dbName,

  // todo: require or throw
  JWT_SEED: process.env.JWT_SEED || '',
}
