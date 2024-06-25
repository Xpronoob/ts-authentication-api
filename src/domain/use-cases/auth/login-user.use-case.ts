import { JwtAdapter } from '../../../config'
import { LoginUserDto } from '../../dtos/auth/login-user.dto'
import { AuthRepository } from '../../repositories/auth.repository'
import { CustomError } from '../../errors/custom.error'
import { Response } from 'express'

interface UserToken {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

interface LoginUserUseCase {
  execute: (loginUserDto: LoginUserDto, res: Response) => Promise<UserToken>
}

export class LoginUserImp implements LoginUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute (loginUserDto: LoginUserDto, res: Response): Promise<UserToken> {
    // Login user with repository
    const user = await this.authRepository.login(loginUserDto)

    // SignToken
    const token = await this.signToken({ id: user.id }, '2h')
    if (!token) throw CustomError.internalServer('Error generating token')

    // Save token in cookie
    // httpOnly: true - not accesible from JavaScript
    // secure: true - only send over HTTPS
    // sameSite: strict - only send over HTTPS
    res.cookie('token', token, { httpOnly: true, secure: true })

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }
}
