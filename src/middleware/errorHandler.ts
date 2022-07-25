import { NextFunction, Request, Response } from 'express'

export class ErrorResponse extends Error {
  constructor(message: string, public statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const errorHandler = (
  error: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode || 500).send({ massage: error.message })
}
