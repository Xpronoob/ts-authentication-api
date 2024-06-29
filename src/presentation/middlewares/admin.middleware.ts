import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../config'
import { error } from 'console'
import { UserModel } from '../../data/mongodb'

// todo: get token from cookies
export class AdminMiddleware {
  static validateRoles = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Validate Roles (Middleware)')
    next()
  }
}
