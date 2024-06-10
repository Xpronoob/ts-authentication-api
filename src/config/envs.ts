import dotenv from 'dotenv'

// Carga las variables de entorno desde el archivo .env
dotenv.config()

export const getPort = (): number | undefined => {
  const port = process.env.PORT
  try {
    if (!port) {
      throw new Error('PORT is not defined in the environment variables')
    }
    const num = Number.parseInt(port, 10)
    if (isNaN(num)) {
      throw new Error(`PORT is not a valid number: ${port}`)
    }
    return num
  } catch (error) {

  }
}

export const envs = {
  PORT: getPort()
}
