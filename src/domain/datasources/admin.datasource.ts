import { UserEntity } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/admin/create-user.dto'
export abstract class AdminDatasource {
  // todo:

  abstract create (createUserDto: CreateUserDto): Promise<UserEntity>
}
