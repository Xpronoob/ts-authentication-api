import { AuthDatasource, AuthRepository } from '../../domain'
import { UserEntity } from '../../domain/entities'
import { LoginUserDto, RegisterUserDto } from '../../domain/dtos'

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    return await this.authDatasource.login(loginUserDto)
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return await this.authDatasource.register(registerUserDto)
  }
}
