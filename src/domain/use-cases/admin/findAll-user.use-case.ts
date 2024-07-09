import { AdminRepository } from '../../repositories/admin.repository'
import { Response } from 'express'
import { PublicUserEntity } from '../../entities/public-user.entity'

interface FindAllUserUseCase {
  execute: (res: Response) => Promise<PublicUserEntity[]>
}

export class FindAllUserImp implements FindAllUserUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(): Promise<PublicUserEntity[]> {
    const users = await this.adminRepository.findAll()

    return users
  }
}
