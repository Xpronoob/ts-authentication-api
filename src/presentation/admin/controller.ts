import { Request, Response } from 'express'
import { AdminRepository, CustomError, RegisterUserImp } from '../../domain'
import { JwtAdapter } from '../../config/jwt.adapter'
import { UserModel } from '../../data/mongodb'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'
import { LoginUserImp } from '../../domain/use-cases/auth/login-user.use-case'
import { ProfileUserDto } from '../../domain/dtos/auth/profile-user.dto'
import { CreateUserDto } from '../../domain/dtos/admin/create-user.dto'
import { CreateUserImp } from '../../domain/use-cases/admin/create-user.use-case'

export class AdminController {
  // DI
  constructor (
    private readonly adminRepository: AdminRepository
  ) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(error) // Winston or another logger
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  createUser = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new CreateUserImp(this.adminRepository)
      .execute(createUserDto!, res)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }
}
