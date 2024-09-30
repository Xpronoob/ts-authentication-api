import { UserRepository } from '../../repositories/users/user.repository'
import { Response } from 'express'
import { FindByUserDto } from '../../dtos/user/findBy-user.dto'
import { UserEntity } from '../../entities/user.entity'

interface FindByIdUserUseCase {
  execute: (findByUserDto: FindByUserDto, res: Response) => Promise<UserEntity>
}

export class FindByIdUserImp implements FindByIdUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(findByUserDto: FindByUserDto): Promise<UserEntity> {
    const users = await this.userRepository.findById(findByUserDto)

    return users
  }
}
