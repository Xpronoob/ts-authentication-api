import { Request, Response } from 'express'
import { UserRepository } from '../../domain/repositories'
import { CustomError } from '../../domain/errors'
import { CreateUserDto, FindByUserDto, UpdateUserDto, DeleteUserDto } from '../../domain/dtos'
import { CreateUserImp, FindByUserImp, FindAllUserImp, UpdateUserImp, DeleteUserImp, FindByIdUserImp } from '../../domain/use-cases'
import {  } from 'domain/use-cases/user/findById-user.use-case'

export class UserController {
  // DI
  constructor(private readonly userRepository: UserRepository) {}

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

    new CreateUserImp(this.userRepository)
      .execute(createUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  findBy = (req: Request, res: Response) => {
    const [error, findUserDto] = FindByUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new FindByUserImp(this.userRepository)
      .execute(findUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  findById = (req: Request, res: Response) => {
    const [error, findUserDto] = FindByUserDto.create(req.params)
    if (error) return res.status(400).json({ error })

    new FindByIdUserImp(this.userRepository)
      .execute(findUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  findAll = (req: Request, res: Response) => {
    new FindAllUserImp(this.userRepository)
      .execute()
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  delete = (req: Request, res: Response) => {
    const [error, deleteUserDto] = DeleteUserDto.create(req.params.id, req.body)
    if (error) return res.status(400).json({ error })

    new DeleteUserImp(this.userRepository)
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
    const [error, updateUserDto] = UpdateUserDto.create(req.params.id, req.body)
    if (error) return res.status(400).json({ error })

    new UpdateUserImp(this.userRepository)
      .execute(updateUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
