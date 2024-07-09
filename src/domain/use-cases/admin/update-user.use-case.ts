import { UpdateUserDto } from '../../dtos/admin/update-user.dto'
import { AdminRepository } from '../../repositories/admin.repository'

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
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(updateUserDto: UpdateUserDto): Promise<NewUser> {
    // Update user with repository
    const user = await this.adminRepository.update(updateUserDto)
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
