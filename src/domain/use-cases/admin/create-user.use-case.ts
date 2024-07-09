import { CreateUserDto } from '../../dtos/admin/create-user.dto'
import { AdminRepository } from '../../repositories/admin.repository'
import { Response } from 'express'

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
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<NewUser> {
    const user = await this.adminRepository.create(createUserDto)
    const { name, email, roles } = user

    const newUser: NewUser = {
      user: {
        id: user.id,
        name,
        email,
        roles,
      },
    }

    return newUser
  }
}
