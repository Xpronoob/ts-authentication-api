import { UserRepository } from '../../repositories/users/user.repository'
import { Response } from 'express'
import { FindByUserDto } from '../../dtos/user/findBy-user.dto'
import { UserEntity } from '../../entities/user.entity'

interface FindByUserUseCase {
  execute: (findByUserDto: FindByUserDto, res: Response) => Promise<UserEntity>
}

export class FindByUserImp implements FindByUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(findByUserDto: FindByUserDto): Promise<UserEntity> {
    const users = await this.userRepository.findBy(findByUserDto)

    return users
  }
}
