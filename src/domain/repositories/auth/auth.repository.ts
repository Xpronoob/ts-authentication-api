import { UserEntity } from '../../entities/user.entity'
import { RegisterUserDto, LoginUserDto } from '../../dtos'
export abstract class AuthRepository {
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>
}
