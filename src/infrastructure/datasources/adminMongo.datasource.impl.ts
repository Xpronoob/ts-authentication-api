import { UserModel } from '../../data/mongodb'
import { CustomError, CreateUserDto, UserEntity } from '../../domain'
import { BcryptAdapter } from '../../config/bcrypt.adapter'
import { UserMapper } from '../mappers/user.mapper'
import { AdminDatasource } from '../../domain/datasources/admin.datasource'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AdminMongoDatasourceImpl implements AdminDatasource {
  constructor (
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async create (createUserDto: CreateUserDto): Promise<UserEntity> {
    // 1. Validate request
    const { name, email, password, roles, img } = createUserDto

    try {
      // 2. Hash the password and save in database
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
        img,
        roles
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
