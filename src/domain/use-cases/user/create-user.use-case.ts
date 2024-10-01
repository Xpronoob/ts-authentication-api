import { addressUser } from 'domain/entities'
import { CreateUserDto } from '../../dtos/user/create-user.dto'
import { UserRepository } from '../../repositories/users/user.repository'
import { Response } from 'express'
// import { UserEntity } from '../../entities'

interface NewUser {
  user: {
    id: string
    name: string
    email: string
    roles: string[]
    password?: string
    _id?: string
    lastname?: string
    img?: string
    phone?: string
    address?: addressUser
  }
}

interface CreateUserUseCase {
  execute: (createUserDto: CreateUserDto, res: Response) => Promise<NewUser>
}

export class CreateUserImp implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<NewUser> {
    const user = await this.userRepository.create(createUserDto)
    const { name, email, roles, img, lastname, phone, address } = user

    const newUser: NewUser = {
      user: {
        id: user.id,
        name,
        email,
        roles,
        img,
        lastname,
        phone,
        address,
      },
    }

    return newUser
  }
}
