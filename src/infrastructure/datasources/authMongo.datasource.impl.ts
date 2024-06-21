import { UserModel } from '../../data/mongodb'
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from '../../domain'

export class AuthMongoDatasourceImpl implements AuthDatasource {
  async register (registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto

    try {
      console.log('debug')
      // 1. Check if email already exists
      const exists = await UserModel.findOne({ email })
      if (exists != null) throw CustomError.badRequest('User already exists')

      const user = await UserModel.create({
        name,
        email,
        password
      })

      // 2. Hash the password

      // 3. Map response

      return new UserEntity(
        user.id,
        name,
        email,
        password,
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
