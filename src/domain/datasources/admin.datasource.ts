import { UserEntity } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/admin/create-user.dto'
import { FindByUserDto } from '../dtos/admin/findBy-user.dto'
import { PublicUserEntity } from '../entities/public-user.entity'
import { DeleteUserDto } from '../dtos/admin/delete-user.dto'
import { UpdateUserDto } from '../dtos/admin/update-user.dto'

export abstract class AdminDatasource {
  // todo:
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>
  abstract findAll(): Promise<PublicUserEntity[]>
  // abstract findById (id: string): Promise<UserEntity>
  // abstract findByEmail (email: string): Promise<UserEntity>
  // abstract findByName (name: string): Promise<UserEntity>
  abstract findBy(findByUserDto: FindByUserDto): Promise<PublicUserEntity>
  abstract update(updateUserDto: UpdateUserDto): Promise<PublicUserEntity>
  abstract delete(deleteUserDto: DeleteUserDto): Promise<boolean>
}
