import { UserModel } from '../../data/mongodb'
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from '../../domain'
import { BcryptAdapter } from '../../config/bcrypt.adapter'
import { UserMapper } from '../mappers/user.mapper'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AuthMongoDatasourceImpl implements AuthDatasource {
  constructor (
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

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
        password: this.hashPassword(password)
      })

      await user.save()

      // 3. Map response

      return UserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
