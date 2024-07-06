import { UserModel } from '../../data/mongodb'
import { CustomError, CreateUserDto, UserEntity } from '../../domain'
import { BcryptAdapter } from '../../config/bcrypt.adapter'
import { UserMapper } from '../mappers/user.mapper'
import { AdminDatasource } from '../../domain/datasources/admin.datasource'
import { FindByUserDto } from '../../domain/dtos/admin/findBy-user.dto'
import { PublicUserMapper } from '../mappers/public-user.mapper'
import { PublicUserEntity } from '../../domain/entities/public-user.entity'

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

  async findBy (findByUserDto: FindByUserDto): Promise<PublicUserEntity[]> {
    // 1. Search criteria
    const { name, email, roles } = findByUserDto

    const searchCriteria: any = {}
    if (name) searchCriteria.name = new RegExp(name, 'i')
    if (email) searchCriteria.email = new RegExp(email, 'i')
    if (roles) searchCriteria.roles = { $all: roles }

    try {
      // 2. Find users
      const userFinded = await UserModel.find(searchCriteria).exec()
      // console.log(userFinded) // [{}]

      // 3. Map response
      return PublicUserMapper.userEntityArrayFromObjectArray(userFinded)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async findAll (): Promise<PublicUserEntity[]> {
    try {
      const users = await UserModel.find().exec()
      return PublicUserMapper.userEntityArrayFromObjectArray(users)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
