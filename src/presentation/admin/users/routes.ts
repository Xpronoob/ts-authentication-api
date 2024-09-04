import { Router } from 'express'
import { AdminController } from './controller'
import { AdminMiddleware, AuthMiddleware } from '../../middlewares'

import { AdminMongoDatasourceImpl } from '../../../infrastructure/datasources/adminMongo.datasource.impl'
import { AdminRepositoryImpl } from '../../../infrastructure/repositories/admin.repository.impl'

export class AdminUserRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new AdminMongoDatasourceImpl()
    const adminRepository = new AdminRepositoryImpl(datasource)

    const controller = new AdminController(adminRepository)

    router.post('/users', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.create)
    router.get('/users', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findAll)
    router.get('/users/:id', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findBy)
    router.patch('/users/:id', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.update)
    router.delete('/users/:id', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.delete)

    // router.get('/findUserByEmail/:email', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findByEmail)
    // router.post('/findUserByName', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findByName)
    return router
  }
}
