import { Request, Response } from 'express'
import { AuthRepository, CustomError, RegisterUserDto, RegisterUserImp } from '../../domain'
import { JwtAdapter } from '../../config/jwt.adapter'
import { UserModel } from '../../data/mongodb'
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto'
import { LoginUserImp } from '../../domain/use-cases/auth/login-user.use-case'

export class AuthController {
  // DI
  constructor (
    private readonly authRepository: AuthRepository
  ) {}

  private readonly handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message })
    }

    console.log(error) // Winston or another logger
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new RegisterUserImp(this.authRepository)
      .execute(registerUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new LoginUserImp(this.authRepository)
      .execute(loginUserDto!)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then(users => {
        res.json({
          // users,
          user: req.body.user
        })
      })
      .catch(() => res.status(500).json({ error: 'Internal Server Error' }))
  }
}
