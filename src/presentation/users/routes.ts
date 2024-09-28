import { Router } from 'express'
import { UserController } from './controller'
import { AuthMiddleware, RolesMiddleware } from '../middlewares'

import { UserRepositoryImpl, UserMongoDatasourceImpl } from '../../infrastructure'

export class UserRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new UserMongoDatasourceImpl()
    const userRepository = new UserRepositoryImpl(datasource)

    const controller = new UserController(userRepository)

    router.post(
      '/users',
      [AuthMiddleware.validateJWT, RolesMiddleware.validateRoles(['ADMIN_ROLE', 'ADMIN_USERS'])],
      controller.create,
    )
    router.get(
      '/users',
      [AuthMiddleware.validateJWT, RolesMiddleware.validateRoles(['ADMIN_ROLE', 'ADMIN_USERS'])],
      controller.findAll,
    )
    // router.get('/usersIds', [AuthMiddleware.validateJWT, RolesMiddleware.validateRoles(['ADMIN_ROLE', 'ADMIN_USERS'])], controller.findAllIds)
    router.get(
      '/users/:id',
      [AuthMiddleware.validateJWT, RolesMiddleware.validateRoles(['ADMIN_ROLE', 'ADMIN_USERS'])],
      controller.findBy,
    )
    router.patch(
      '/users/:id',
      [AuthMiddleware.validateJWT, RolesMiddleware.validateRoles(['ADMIN_ROLE', 'ADMIN_USERS'])],
      controller.update,
    )
    router.delete(
      '/users/:id',
      [AuthMiddleware.validateJWT, RolesMiddleware.validateRoles(['ADMIN_ROLE', 'ADMIN_USERS'])],
      controller.delete,
    )

    return router
  }
}
