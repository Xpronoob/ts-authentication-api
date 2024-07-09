import { AdminRepository } from '../../repositories/admin.repository'
import { Response } from 'express'
import { DeleteUserDto } from '../../dtos/admin/delete-user.dto'

interface DeleteUserUseCase {
  execute: (deleteUserDto: DeleteUserDto, res: Response) => Promise<boolean>
}

export class DeleteUserImp implements DeleteUserUseCase {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<boolean> {
    const deleteResponse = await this.adminRepository.delete(deleteUserDto)
    return deleteResponse
  }
}
