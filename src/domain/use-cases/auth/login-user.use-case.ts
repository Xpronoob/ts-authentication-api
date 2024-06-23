import { JwtAdapter } from '../../../config'
import { LoginUserDto } from '../../dtos/auth/login-user.dto'
import { AuthRepository } from '../../repositories/auth.repository'
import { CustomError } from '../../errors/custom.error'

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
  execute: (loginUserDto: LoginUserDto) => Promise<UserToken>
}

export class LoginUserImp implements LoginUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute (loginUserDto: LoginUserDto): Promise<UserToken> {
    // todo: create user
    const user = await this.authRepository.login(loginUserDto)

    // todo: token
    const token = await this.signToken({ id: user.id }, '2h')
    if (!token) throw CustomError.internalServer('Error generating token')

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
