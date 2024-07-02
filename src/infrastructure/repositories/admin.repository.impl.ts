import { AdminRepository, UserEntity, AdminDatasource, CreateUserDto } from '../../domain'
import { FindByUserDto } from '../../domain/dtos/admin/findBy-user.dto'
import { PublicUserEntity } from '../../domain/entities/public-user.entity'

export class AdminRepositoryImpl implements AdminRepository {
  constructor (
    private readonly adminDatasource: AdminDatasource
  ) {}

  async create (createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.adminDatasource.create(createUserDto)
  }

  async findBy (findByUserDto: FindByUserDto): Promise<PublicUserEntity[]> {
    return await this.adminDatasource.findBy(findByUserDto)
  }
}
