import { UserMapper, PublicUserMapper } from '../mappers'
import { CustomError, UserEntity, PublicUserEntity, AdminDatasource } from '../../domain'
import { CreateUserDto, FindByUserDto, UpdateUserDto, DeleteUserDto } from '../../domain/dtos'
import { UserModel } from '../../data/mongodb'
import { BcryptAdapter } from '../../config/bcrypt.adapter'

type HashFunction = (password: string) => string
type CompareFunction = (password: string, hashed: string) => boolean

export class AdminMongoDatasourceImpl implements AdminDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    // 1. Validate request
    const { name, email, password, roles, img } = createUserDto

    try {
      // 2. Hash the password and save in database
      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
        img,
        roles,
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

  async findBy(findByUserDto: FindByUserDto): Promise<PublicUserEntity> {
    // 1. Search criteria
    const { id, name, email } = findByUserDto

    const searchCriteria: any = {}
    if (id) searchCriteria.id = new RegExp(id, 'i')
    if (name) searchCriteria.name = new RegExp(name, 'i')
    if (email) searchCriteria.email = new RegExp(email, 'i')

    try {
      // 2. Find users
      // const userFinded = await UserModel.find(searchCriteria).exec()
      const userFinded = await UserModel.findById(id).exec()
      // console.log(userFinded) // [{}]

      // 3. Map response
      return PublicUserMapper.userEntityFromObject(userFinded)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async findAll(): Promise<PublicUserEntity[]> {
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

  async delete(deleteUserDto: DeleteUserDto): Promise<boolean> {
    try {
      const { id, email } = deleteUserDto
      const query: { [key: string]: any } = {}
      if (id) query._id = id
      if (email) query.email = email

      const deleteResponse = await UserModel.deleteOne(query).exec()

      if (deleteResponse.deletedCount === 0) {
        return false
      }

      return true
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }

  async update(updateUserDto: UpdateUserDto): Promise<PublicUserEntity> {
    const { id, name, email, password, roles, img } = updateUserDto
    const updateFields: { [key: string]: any } = { name, email, roles, img }

    if (password) {
      updateFields.password = this.hashPassword(password)
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(id, { $set: updateFields }, { new: true }).exec()
      const user = await UserModel.findById(id).exec()

      if (!updatedUser) {
        throw CustomError.notFound('User not found')
      }

      return PublicUserMapper.userEntityFromObject(user)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      throw CustomError.internalServer()
    }
  }
}
