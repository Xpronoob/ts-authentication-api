import { UpdateUserDto } from '../../dtos/user/update-user.dto'
import { UserRepository } from '../../repositories/users/user.repository'

interface NewUser {
  user: {
    id?: string
    name?: string
    email?: string
    roles?: string[]
    img?: string
  }
}

interface UpdateUserUseCase {
  execute: (updateUserDto: UpdateUserDto) => Promise<NewUser>
}

export class UpdateUserImp implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<NewUser> {
    const user = await this.userRepository.update(updateUserDto)
    const { name, email, roles } = user

    const newUser: NewUser = {
      user: {
        // id: user.id,
        name,
        email,
        roles,
      },
    }

    return newUser
  }
}
