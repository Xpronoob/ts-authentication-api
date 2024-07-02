import { UserEntity } from '../entities/user.entity'
import { CreateUserDto } from '../dtos/admin/create-user.dto'
import { FindByUserDto } from '../dtos/admin/findBy-user.dto'
import { PublicUserEntity } from '../entities/public-user.entity'

export abstract class AdminDatasource {
  // todo:
  abstract create (createUserDto: CreateUserDto): Promise<UserEntity>
  // abstract findAll (): Promise<UserEntity[]>
  // abstract findById (id: string): Promise<UserEntity>
  // abstract findByEmail (email: string): Promise<UserEntity>
  // abstract findByName (name: string): Promise<UserEntity>
  abstract findBy (findByUserDto: FindByUserDto): Promise<PublicUserEntity[]>
  // abstract update (): Promise<UserEntity>
  // abstract delete (): Promise<UserEntity>
}
