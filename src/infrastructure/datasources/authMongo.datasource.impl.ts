import { UserModel } from '../../data/mongodb'
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from '../../domain'
import { BcryptAdapter } from '../../config/bcrypt.adapter';

export class AuthMongoDatasourceImpl implements AuthDatasource {
  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto

    try {
      // 1. Check if email already exists
      const exists = await UserModel.findOne({ email })
      if (exists != null) throw CustomError.badRequest('User already exists')

      // 2. Hash the password
      const user = await UserModel.create({
        name,
        email,
        password: BcryptAdapter.hash(password)
      })

      await user.save()

      // 3. Map response

      return new UserEntity(
        user.id,
        name,
        email,
        user.password,
        user.roles
      )
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
