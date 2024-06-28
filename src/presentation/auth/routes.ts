import { Router } from 'express'
import { AuthController } from './controller'
import { AuthDatasourceImpl, AuthRepositoryImpl, AuthMongoDatasourceImpl } from '../../infrastructure/'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class AuthRoutes {
  static get routes (): Router {
    const router = Router()

    const datasource = new AuthMongoDatasourceImpl()
    const authRepository = new AuthRepositoryImpl(datasource)

    const controller = new AuthController(authRepository)

    router.post('/login', controller.loginUser)
    router.post('/register', controller.registerUser)

    router.get('/me', [AuthMiddleware.validateJWT], controller.getProfile)

    return router
  }
}
