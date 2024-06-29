import { Router } from 'express'
import { AdminController } from './controller'
import { AdminMiddleware } from '../middlewares/admin.middleware'
import { AuthMiddleware } from '../middlewares/auth.middleware'

import { AdminMongoDatasourceImpl } from '../../infrastructure/datasources/adminMongo.datasource.impl'
import { AdminRepositoryImpl } from '../../infrastructure/repositories/admin.repository.impl'

export class AdminRoutes {
  static get routes (): Router {
    const router = Router()

    const datasource = new AdminMongoDatasourceImpl()
    const adminRepository = new AdminRepositoryImpl(datasource)

    const controller = new AdminController(adminRepository)

    router.post('/createUser', [AuthMiddleware.validateJWT, AdminMiddleware.validateRoles], controller.createUser)
    // router.post('/createUser', [AuthMiddleware.validateJWT], controller.createUser)

    return router
  }
}
