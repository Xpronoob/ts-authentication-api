import { addressUser } from 'domain/entities'
import { UpdateUserDto } from '../../dtos/user/update-user.dto'
import { UserRepository } from '../../repositories/users/user.repository'

interface UpdateUser {
  user: {
    id?: string
    name?: string
    email?: string
    roles?: string[]
    password?: string
    _id?: string
    lastname?: string
    img?: string
    phone?: string
    address?: addressUser
  }
}

interface UpdateUserUseCase {
  execute: (updateUserDto: UpdateUserDto) => Promise<UpdateUser>
}

export class UpdateUserImp implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<UpdateUser> {
    const user = await this.userRepository.update(updateUserDto)
    const { name, email, roles, img, lastname, phone, address } = user

    const updateUser: UpdateUser = {
      user: {
        // id: user.id,
        name,
        email,
        roles,
        img,
        lastname,
        phone,
        address,
      },
    }

    return updateUser
  }
}
