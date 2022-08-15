import cookieParser from 'cookie-parser'
import express, { Application, Request, Response } from 'express'
import { errorHandler } from 'middleware/error_handler'
import morgan from 'morgan'
import routes from 'routes'
import { reqLog } from 'utils'

const app: Application = express()
const morganToFileLogger = morgan('dev', {
  stream: { write: (message) => reqLog.info(message.trim()) }
})
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(morganToFileLogger)
// routes
routes(app)
// error handler
app.use(errorHandler)
// health check
app.get('/', (_req: Request, res: Response) => res.sendStatus(200))

export default app
