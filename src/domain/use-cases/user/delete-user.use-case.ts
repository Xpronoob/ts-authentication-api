import { UserRepository } from '../../repositories/users/user.repository'
import { Response } from 'express'
import { DeleteUserDto } from '../../dtos/user/delete-user.dto'

interface DeleteUserUseCase {
  execute: (deleteUserDto: DeleteUserDto, res: Response) => Promise<boolean>
}

export class DeleteUserImp implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<boolean> {
    const deleteResponse = await this.userRepository.delete(deleteUserDto)
    return deleteResponse
  }
}
