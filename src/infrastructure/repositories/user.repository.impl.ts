import { UserDatasource } from '../../domain/datasources'
import { UserRepository } from '../../domain/repositories'
import { UserEntity } from '../../domain/entities'
import { FindByUserDto, UpdateUserDto, DeleteUserDto, CreateUserDto } from '../../domain/dtos'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatasource: UserDatasource) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userDatasource.create(createUserDto)
  }

  async findBy(findByUserDto: FindByUserDto): Promise<UserEntity> {
    return await this.userDatasource.findBy(findByUserDto)
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userDatasource.findAll()
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<boolean> {
    return await this.userDatasource.delete(deleteUserDto)
  }

  async update(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return await this.userDatasource.update(updateUserDto)
  }
}
