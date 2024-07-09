import { AdminRepository, AdminDatasource } from '../../domain'
import { PublicUserEntity, UserEntity } from '../../domain/entities'
import { FindByUserDto, UpdateUserDto, DeleteUserDto, CreateUserDto } from '../../domain/dtos'

export class AdminRepositoryImpl implements AdminRepository {
  constructor(private readonly adminDatasource: AdminDatasource) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.adminDatasource.create(createUserDto)
  }

  async findBy(findByUserDto: FindByUserDto): Promise<PublicUserEntity[]> {
    return await this.adminDatasource.findBy(findByUserDto)
  }

  async findAll(): Promise<PublicUserEntity[]> {
    return await this.adminDatasource.findAll()
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<boolean> {
    return await this.adminDatasource.delete(deleteUserDto)
  }

  async update(updateUserDto: UpdateUserDto): Promise<PublicUserEntity> {
    return await this.adminDatasource.update(updateUserDto)
  }
}
