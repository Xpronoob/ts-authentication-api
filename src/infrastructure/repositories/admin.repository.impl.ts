import { AdminRepository, CreateUserDto, UserEntity, AdminDatasource } from '../../domain'

export class AdminRepositoryImpl implements AdminRepository {
  constructor (
    private readonly adminDatasource: AdminDatasource
  ) {}

  async create (createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.adminDatasource.create(createUserDto)
  }
}
