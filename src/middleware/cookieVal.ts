import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from './errorHandler'

export const cookieValidator = (req: Request, res: Response, next: NextFunction) => {
  if (!req.cookies.token) throw new ErrorResponse('Unauthorized', 401)
  next()
}
