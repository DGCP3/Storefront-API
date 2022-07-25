import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import express, { Application, NextFunction, Request, Response } from 'express'
import { reqLog } from '@utils/logger'

const app: Application = express()
const morganToFileLogger = morgan('common', {
  stream: {
    write: (message) => reqLog.info(message.trim())
  }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
app.use(morganToFileLogger)

app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers')
  next()
})
export default app
