import config from 'configs/default'
import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from 'types/error'
import { log } from 'utils/logger'

const { env } = config

export const errorHandler = (
  error: ErrorResponse,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (env === 'development') {
    res.status(error.statusCode || 500).send({ massage: error.message })
    log.error(error.message)
    log.error(error.stack)
    return
  }
  if (error instanceof ErrorResponse) {
    res.status(error.statusCode).json({ error: error.message })
  } else {
    res.status(500).json({ error: 'Oops...Something went wrong.' })
  }
}
