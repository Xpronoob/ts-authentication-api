import { AdminRepository } from '../../repositories/admin.repository'
import { CustomError } from '../../errors/custom.error'
import { Response } from 'express'
import { UserModel } from '../../../data/mongodb/models/user.model'
import { FindByUserDto } from '../../dtos/admin/findBy-user.dto'
import { PublicUserEntity } from '../../entities/public-user.entity'

interface FindByUserUseCase {
  execute: (findByUserDto: FindByUserDto, res: Response) => Promise<PublicUserEntity[]>
}

export class FindByUserImp implements FindByUserUseCase {
  constructor (
    private readonly adminRepository: AdminRepository
  ) {}

  async execute (findByUserDto: FindByUserDto, res: Response): Promise<PublicUserEntity[]> {
    // Find user with repository
    const users = await this.adminRepository.findBy(findByUserDto)

    return users
  }
}
