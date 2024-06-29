import { Router } from 'express'
import { AuthRoutes } from './auth/routes'
import { AdminRoutes } from './admin/routes'

export class AppRoutes {
  static get routes (): Router {
    const router = Router()

    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/admin', AdminRoutes.routes)

    return router
  }
}
