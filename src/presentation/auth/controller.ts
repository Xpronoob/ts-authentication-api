import { Request, Response } from 'express'
import { CustomError } from '../../domain/errors'
import { AuthRepository } from '../../domain/repositories'
import { RegisterUserDto, LoginUserDto, ProfileUserDto } from '../../domain/dtos'
import { RegisterUserImp, LoginUserImp } from '../../domain/use-cases'

export class AuthController {
  // DI
  constructor(private readonly authRepository: AuthRepository) {}

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
      .execute(registerUserDto!, res)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body)
    if (error) return res.status(400).json({ error })

    new LoginUserImp(this.authRepository)
      .execute(loginUserDto!, res)
      .then(data => res.json(data))
      .catch(error => this.handleError(error, res))
  }

  logoutUser = (req: Request, res: Response) => {
    res.clearCookie('accessToken', { path: '/' })
    res.clearCookie('refreshToken', { path: '/' })
    res.status(200).send({ message: 'Logged out' })
  }

  getProfile = (req: Request, res: Response) => {
    const [error, profileUserDto] = ProfileUserDto.create(req.body.user)
    if (error) return res.status(400).json({ error })
    res.json({
      user: profileUserDto,
    })
  }
}
