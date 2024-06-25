import { AuthDatasource, AuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from '../../domain'

export class AuthRepositoryImpl implements AuthRepository {
  constructor (
    private readonly authDatasource: AuthDatasource
  ) {}

  async login (loginUserDto: LoginUserDto): Promise<UserEntity> {
    return await this.authDatasource.login(loginUserDto)
  }

  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return await this.authDatasource.register(registerUserDto)
  }
}
