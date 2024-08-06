import { JwtAdapter } from '../../../config'
import { LoginUserDto } from '../../dtos/auth/login-user.dto'
import { AuthRepository } from '../../repositories/auth.repository'
import { CustomError } from '../../errors/custom.error'
import { Response } from 'express'
import { RefreshTokenModel } from '../../../data/mongodb'

interface UserToken {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    name: string
    email: string
    roles: string[]
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

interface LoginUserUseCase {
  execute: (loginUserDto: LoginUserDto, res: Response) => Promise<UserToken>
}

export class LoginUserImp implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signAccessToken: SignToken = JwtAdapter.generateAccessToken,
    private readonly signRefreshToken: SignToken = JwtAdapter.generateRefreshToken,
  ) {}

  async execute(loginUserDto: LoginUserDto, res: Response): Promise<UserToken> {
    // Login user with repository
    const user = await this.authRepository.login(loginUserDto)

    // SignToken
    const accessToken = await this.signAccessToken({ id: user.id }, '1h')
    const refreshToken = await this.signRefreshToken({ id: user.id }, '30d')

    if (!accessToken || !refreshToken) throw CustomError.internalServer('Error generating token')

    // Save Access Token & Refresh Token in cookie
    // httpOnly: true - not accesible from JavaScript
    // secure: true - only send over HTTPS
    // sameSite: strict - only send in request from same site
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true })
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true })

    // Save Refresh Token in database
    await RefreshTokenModel.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30d
    })

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    }
  }
}
