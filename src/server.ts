import cookieParser from 'cookie-parser'
import express, { Application, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import { reqLog } from 'utils'

const app: Application = express()
const morganToFileLogger = morgan('dev', {
  stream: { write: (message) => reqLog.info(message.trim()) }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(morganToFileLogger)

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
export default app
