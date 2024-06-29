import { CreateUserDto } from '../../dtos/admin/create-user.dto'
import { AdminRepository } from '../../repositories/admin.repository'
import { CustomError } from '../../errors/custom.error'
import { Response } from 'express'
import { UserModel } from '../../../data/mongodb/models/user.model'

interface NewUser {
  user: {
    id: string
    name: string
    email: string
    roles: string[]
    img?: string
  }
}

interface CreateUserUseCase {
  execute: (createUserDto: CreateUserDto, res: Response) => Promise<NewUser>
}

export class CreateUserImp implements CreateUserUseCase {
  constructor (
    private readonly adminRepository: AdminRepository
  ) {}

  async execute (createUserDto: CreateUserDto, res: Response): Promise<NewUser> {
    // Create user with repository
    const user = await this.adminRepository.create(createUserDto)
    const { name, email, roles } = user

    const newUser: NewUser = {
      user: {
        id: user.id,
        name,
        email,
        roles
      }
    }

    return newUser
  }
}
