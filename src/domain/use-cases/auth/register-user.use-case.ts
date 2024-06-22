import { JwtAdapter } from '../../../config'
import { RegisterUserDto } from '../../dtos/auth/register-user.dto'
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

interface RegisterUserUseCase {
  execute: (registeUserDto: RegisterUserDto) => Promise<UserToken>
}

export class RegisterUserImp implements RegisterUserUseCase {
  constructor (
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute (registeUserDto: RegisterUserDto): Promise<UserToken> {
    // todo: create user
    const user = await this.authRepository.register(registeUserDto)

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
