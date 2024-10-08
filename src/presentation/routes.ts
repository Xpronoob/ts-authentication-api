import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { UserRoutes } from './users/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api', UserRoutes.routes)
    // router.use('/api', CategoriesRoutes.routes)

    return router
  }
}
