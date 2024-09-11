import express, { Router } from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { envs } from '../config'

interface Options {
  port?: number
  routes: Router
}

export class Server {
  public readonly app = express()
  private readonly port: number
  private readonly routes: Router

  constructor(options: Options) {
    const { port = 3030, routes } = options
    this.port = port
    this.routes = routes
  }

  async start(): Promise<void> {
    const corsOptions: cors.CorsOptions = {
      origin: [envs.FRONTEND_URL],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true, // Allow sending cookies
      allowedHeaders: ['Content-Type', 'Authorization'],
    }
    // Middlewares
    this.app.use(express.json())
    this.app.use(morgan('dev'))
    this.app.use(cookieParser())
    // this.app.use(express.urlencoded({ extended: true })) // Accept x-www-form-urlencoded
    this.app.use(cors(corsOptions))

    // Routes
    this.app.use(this.routes)

    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    })
  }
}
