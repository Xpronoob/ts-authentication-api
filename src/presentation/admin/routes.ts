import { Router } from 'express'
import { AdminController } from './controller'
import { AdminMiddleware } from '../middlewares/admin.middleware'
import { AuthMiddleware } from '../middlewares/auth.middleware'

import { AdminMongoDatasourceImpl } from '../../infrastructure/datasources/adminMongo.datasource.impl'
import { AdminRepositoryImpl } from '../../infrastructure/repositories/admin.repository.impl'

export class AdminRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new AdminMongoDatasourceImpl()
    const adminRepository = new AdminRepositoryImpl(datasource)

    const controller = new AdminController(adminRepository)

    router.post('/createUser', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.create)
    router.get('/findAll', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findAll)
    router.post('/findBy', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findBy)
    // router.get('/findUserByEmail/:email', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findByEmail)
    // router.post('/findUserByName', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.findByName)
    router.post('/updateUser', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.update)
    router.post('/deleteUser', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.delete)

    return router
  }
}
