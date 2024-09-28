import { UserRepository } from '../../repositories/users/user.repository'
import { Response } from 'express'
import { UserEntity } from '../../entities/user.entity'

interface FindAllUserUseCase {
  execute: (res: Response) => Promise<UserEntity[]>
}

export class FindAllUserImp implements FindAllUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll()

    return users
  }
}
