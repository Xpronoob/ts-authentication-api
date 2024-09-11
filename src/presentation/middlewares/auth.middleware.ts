import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../config'
import { RefreshTokenModel, UserModel } from '../../data/mongodb'

// todo: get token from cookies
/**
    Return json in response

    1. Save tokens in cookies (Login/Register/Refresh)
    2. Check validation of access token (if expired, refresh(send refresh and access & validate))
    3. Check session in database (if not exist, clear cookies)
    4. Next()
**/
export class AuthMiddleware {
  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken

    if (!accessToken || !refreshToken) {
      return res.status(401).json({ error: 'No token provided' })
    }

    try {
      const payload = await JwtAdapter.validateAccessToken<{ id: string; expired: boolean }>(accessToken)
      // console.log('Payload Access: ', payload)

      if (!payload) {
        console.log('TOKEN STATE: INVALID')
        return res.status(401).json({ error: 'Invalid access token' })
      }

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
          return res.status(401).json({ error: 'Invalid refresh token' })
        }

        if (payloadRefresh.expired) {
          return res.status(401).json({ error: 'Refresh token expired' })
        }

        const newAccessToken = await JwtAdapter.generateAccessToken({ id: payloadRefresh.id })
        if (!newAccessToken) {
          return res.status(500).json({ error: 'Failed to generate new access token' })
        }

        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true })

        const user = await UserModel.findById(payloadRefresh.id)
        if (!user) return res.status(401).json({ error: 'Try login again' })

        req.body.user = user
        return next()
      }

      if (payload?.id) {
        console.log('TOKEN STATE: VERIFIED')
        const user = await UserModel.findById(payload.id)
        if (!user) return res.status(401).json({ error: 'Try login again' })

        req.body.user = user
        return next()
      }
    } catch (error) {
      console.error('Token validation error:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  }
}
