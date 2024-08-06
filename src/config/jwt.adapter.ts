import jwt from 'jsonwebtoken'
import { envs } from './envs'

const JWT_ACCESS_TOKEN = envs.JWT_ACCESS_TOKEN
const JWT_REFRESH_TOKEN = envs.JWT_REFRESH_TOKEN

export class JwtAdapter {
  // todo: seed generation

  static async generateAccessToken(payload: Object, duration: string = '2h'): Promise<string | null> {
    return await new Promise(resolve => {
      jwt.sign(payload, JWT_ACCESS_TOKEN, { expiresIn: duration }, (err, token) => {
        if (err != null) return resolve(null)

        resolve(token!) // '!' is non-null assertion \ not null, not undefined
      })
    })
  }

  static async generateRefreshToken(payload: Object, duration: string = '2h'): Promise<string | null> {
    return await new Promise(resolve => {
      jwt.sign(payload, JWT_REFRESH_TOKEN, { expiresIn: duration }, (err, token) => {
        if (err != null) return resolve(null)

        resolve(token!) // '!' is non-null assertion \ not null, not undefined
      })
    })
  }

  static async validateAccessToken<T>(token: string): Promise<T | null> {
    return await new Promise(resolve => {
      jwt.verify(token, JWT_ACCESS_TOKEN, (err, decoded) => {
        if (err != null) return resolve(null)
        resolve(decoded as T)
      })
    })
  }

  static async validateRefreshToken<T>(token: string): Promise<T | null> {
    return await new Promise(resolve => {
      jwt.verify(token, JWT_REFRESH_TOKEN, (err, decoded) => {
        if (err != null) return resolve(null)
        resolve(decoded as T)
      })
    })
  }
}
