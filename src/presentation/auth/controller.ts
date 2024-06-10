import { Request, Response } from 'express'

export class AuthController {
  // DI
  constructor () {}

  registerUser = (req: Request, res: Response) => {
    res.json({
      message: 'RegisterController'
    })
  }

  loginUser = (req: Request, res: Response) => {
    res.json({
      message: 'LoginController'
    })
  }
}
