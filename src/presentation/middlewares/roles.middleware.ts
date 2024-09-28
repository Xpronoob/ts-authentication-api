import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../../data/mongodb'

export class RolesMiddleware {
  static validateRoles = (requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      console.log('Validate Roles (Middleware)')

      const { _id: id_body } = req.body.user

      const user = await UserModel.findById(id_body)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      const hasRole = requiredRoles.some(role => user.roles.includes(role))
      if (!hasRole) {
        return res.status(403).json({ message: 'Insufficient permissions' })
      }

      next()
    }
  }
}
