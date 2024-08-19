import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../config'
import { RefreshTokenModel, UserModel } from '../../data/mongodb'

// todo: get token from cookies
export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ error: 'No token provided' })
    }

    try {
      const payload = await JwtAdapter.validateAccessToken<{ id: string }>(accessToken)
      console.log(payload)

      if (payload) {
        const user = await UserModel.findById(payload.id)
        if (!user) return res.status(401).json({ error: 'User not found' })

        req.body.user = user
        return next()
      }

      const storedRefreshToken = await RefreshTokenModel.findOne({ token: refreshToken })
      if (!storedRefreshToken) {
        return res.status(401).json({ error: 'Session not found' })
      }

      const payloadRefresh = await JwtAdapter.validateRefreshToken<{ id: string }>(refreshToken)
      if (!payloadRefresh) {
        return res.status(401).json({ error: 'Invalid refresh token' })
      }

      const newAccessToken = await JwtAdapter.generateAccessToken({ id: payloadRefresh.id })
      if (!newAccessToken) {
        return res.status(500).json({ error: 'Failed to generate new access token' })
      }

      res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true })

      const user = await UserModel.findById(payloadRefresh.id)
      if (!user) return res.status(401).json({ error: 'User not found' })

      req.body.user = user
      next()
    } catch (error) {
      console.error('Error en la validación del token:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
