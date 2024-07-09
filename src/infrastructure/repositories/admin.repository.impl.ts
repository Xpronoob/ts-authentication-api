import { AdminRepository, UserEntity, AdminDatasource, CreateUserDto } from '../../domain'
import { FindByUserDto, UpdateUserDto, DeleteUserDto } from '../../domain/dtos'
import { PublicUserEntity } from '../../domain/entities/public-user.entity'

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
