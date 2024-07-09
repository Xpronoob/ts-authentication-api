import { Request, Response } from 'express'
import { AdminRepository, CustomError } from '../../domain'
import { CreateUserDto } from '../../domain/dtos/admin/create-user.dto'
import { CreateUserImp } from '../../domain/use-cases/admin/create-user.use-case'
import { FindByUserDto } from '../../domain/dtos/admin/findBy-user.dto'
import { FindByUserImp } from '../../domain/use-cases/admin/findBy-user.use-case'
import { FindAllUserImp } from '../../domain/use-cases/admin/findAll-user.use-case'
import { DeleteUserImp } from '../../domain/use-cases/admin/delete-user.use-case'
import { DeleteUserDto } from '../../domain/dtos/admin/delete-user.dto'
import { UpdateUserDto } from '../../domain/dtos/admin/update-user.dto'
import { UpdateUserImp } from '../../domain/use-cases/admin/update-user.use-case'

export class AdminController {
  // DI
  constructor(private readonly adminRepository: AdminRepository) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(error) // Winston or another logger
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  create = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new CreateUserImp(this.adminRepository)
      .execute(createUserDto!, res)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  findBy = (req: Request, res: Response) => {
    if (!req.body.name && !req.body.email) return res.status(400).json({ error: 'Missing search' })
    const [error, findUserDto] = FindByUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new FindByUserImp(this.adminRepository)
      .execute(findUserDto!, res)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  findAll = (req: Request, res: Response) => {
    new FindAllUserImp(this.adminRepository)
      .execute(res)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  delete = (req: Request, res: Response) => {
    const [error, deleteUserDto] = DeleteUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new DeleteUserImp(this.adminRepository)
      .execute(deleteUserDto!)
      .then(success => {
        if (success) {
          res.status(200).json({ message: 'User deleted successfully' })
        } else {
          res.status(404).json({ message: 'User not found' })
        }
      })
      .catch(error => this.handleError(error, res))
  }

  update = (req: Request, res: Response) => {
    const [error, updateUserDto] = UpdateUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new UpdateUserImp(this.adminRepository)
      .execute(updateUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
