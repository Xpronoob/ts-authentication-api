import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../config'
import { RefreshTokenModel, UserModel } from '../../data/mongodb'

export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    // console.log('Cookies recibidas:', req.cookies)

    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    // console.log('Access Token:', accessToken || 'Access Token: No proporcionado')
    // console.log('Refresh Token:', refreshToken || 'Refresh Token: No proporcionado')

    if (!accessToken) {
      return res.status(401).json({ error: 'No access token provided' })
    }

    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' })
    }

    try {
      const payload = await JwtAdapter.validateAccessToken<{ id: string; expired: boolean }>(accessToken)
      // console.log('Payload:', payload)
      if (!payload) {
        console.log('TOKEN STATE: INVALID')
        return res.status(401).json({ error: 'Invalid access token' })
      }

      // console.log('Payload expired:', payload.expired)

      if (payload.expired === true) {
        console.log('TOKEN STATE: ACCESS EXPIRED')

        const storedRefreshToken = await RefreshTokenModel.findOne({ token: refreshToken })
        if (!storedRefreshToken) {
          return res.status(401).json({ error: 'Session not found' })
        }

        const payloadRefresh = await JwtAdapter.validateRefreshToken<{ id: string; expired: boolean }>(
          refreshToken,
        )
        if (!payloadRefresh) {
          console.log('TOKEN STATE: INVALID REFRESH TOKEN')
          return res.status(401).json({ error: 'Invalid refresh token' })
        }

        if (payloadRefresh.expired) {
          console.log('TOKEN STATE: REFRESH EXPIRED')
          return res.status(401).json({ error: 'Refresh token expired' })
        }

        const newAccessToken = await JwtAdapter.generateAccessToken({ id: payloadRefresh.id })
        if (!newAccessToken) {
          return res.status(500).json({ error: 'Failed to generate new access token' })
        }

        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true })

        const user = await UserModel.findById(payloadRefresh.id)
        if (!user) {
          return res.status(401).json({ error: 'Try login again' })
        }

        req.body.user = user
        return next()
      }

      if (payload?.id) {
        console.log('TOKEN STATE: VERIFIED')

        const user = await UserModel.findById(payload.id)
        if (!user) {
          return res.status(401).json({ error: 'Try login again' })
        }

        req.body.user = user
        return next()
      }
    } catch (error) {
      console.error('Token validation error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
