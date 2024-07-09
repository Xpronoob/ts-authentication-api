import { Request, Response } from 'express'
import { AdminRepository, CustomError } from '../../domain'
import { CreateUserDto, FindByUserDto, UpdateUserDto, DeleteUserDto } from '../../domain/dtos'
import { CreateUserImp, FindByUserImp, FindAllUserImp, UpdateUserImp, DeleteUserImp } from '../../domain/use-cases'

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
      .execute(createUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  findBy = (req: Request, res: Response) => {
    const [error, findUserDto] = FindByUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new FindByUserImp(this.adminRepository)
      .execute(findUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  findAll = (req: Request, res: Response) => {
    new FindAllUserImp(this.adminRepository)
      .execute()
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
      .catch(error => {
        this.handleError(error, res)
      })
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
