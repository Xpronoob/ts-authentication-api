import { JwtAdapter } from '../../../config'
import { RegisterUserDto } from '../../dtos/auth/register-user.dto'
import { AuthRepository } from '../../repositories/auth/auth.repository'
import { CustomError } from '../../errors/custom.error'
import { Response } from 'express'
import { RefreshTokenModel } from '../../../data/mongodb/models/refreshToken.model'
import { envs } from '../../../config'
import { convertToMillisencods } from '../../../config/converters'

interface UserToken {
  accessToken: string
  refreshToken: string
  user: {
    id: string
    name: string
    email: string
    role: string[]
  }
}

type SignToken = (payload: Object, duration?: number) => Promise<string | null>

interface RegisterUserUseCase {
  execute: (registeUserDto: RegisterUserDto, res: Response) => Promise<UserToken>
}

export class RegisterUserImp implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signAccessToken: SignToken = JwtAdapter.generateAccessToken,
    private readonly signRefreshToken: SignToken = JwtAdapter.generateRefreshToken,
  ) {}

  async execute(registeUserDto: RegisterUserDto, res: Response): Promise<UserToken> {
    // Register user with repository
    const user = await this.authRepository.register(registeUserDto)

    const accessToken = await this.signAccessToken({ id: user.id })
    const refreshToken = await this.signRefreshToken({ id: user.id })

    if (!accessToken || !refreshToken) throw CustomError.internalServer('Error generating token')

    // Save Access Token & Refresh Token in cookie
    // httpOnly: true - not accesible from JavaScript
    // secure: true - only send over HTTPS
    // sameSite: strict - only send over HTTPS
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: convertToMillisencods(envs.COOKIE_EXPIRES_REFRESH_TOKEN),
    })

    // Save Refresh Token in database
    await RefreshTokenModel.create({
      user_id: user.id,
      token: refreshToken,
      expires_at: new Date(Date.now() + convertToMillisencods(envs.COOKIE_EXPIRES_REFRESH_TOKEN)), //ms
    })

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roles,
      },
    }
  }
}
