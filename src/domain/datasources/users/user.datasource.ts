import { UserEntity } from '../../entities/user.entity'
import { CreateUserDto, FindByUserDto, DeleteUserDto, UpdateUserDto } from '../../dtos'

export abstract class UserDatasource {
  abstract create(createUserDto: CreateUserDto): Promise<UserEntity>
  abstract findAll(): Promise<UserEntity[]>
  // abstract findById (id: string): Promise<UserEntity>
  // abstract findByEmail (email: string): Promise<UserEntity>
  // abstract findByName (name: string): Promise<UserEntity>
  abstract findBy(findByUserDto: FindByUserDto): Promise<UserEntity>
  abstract update(updateUserDto: UpdateUserDto): Promise<UserEntity>
  abstract delete(deleteUserDto: DeleteUserDto): Promise<boolean>
  // abstract getIds(): Promise<[string]>
}
