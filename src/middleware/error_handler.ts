import config from 'configs/default'
import { NextFunction, Request, Response } from 'express'

const { env } = config
export class ErrorResponse extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
    this.statusCode = statusCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  error: ErrorResponse,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (env === 'development') {
    res.status(error.statusCode || 500).send({ massage: error.message })
    return
  }
  if (error instanceof ErrorResponse) {
    res.status(error.statusCode).json({
      error: error.message
    })
  } else {
    res.status(500).json({
      error: 'Oops...Something went wrong.'
    })
  }
}
