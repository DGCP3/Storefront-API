import { NextFunction, Request, Response } from 'express'
import { ErrorResponse } from 'types/error'
import { asyncDecorator, verifyToken } from 'utils'

export const cookieValidator = asyncDecorator(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.token) throw new ErrorResponse('Unauthorized', 401)
    req.user = verifyToken(req.cookies.token)
    return next()
  }
)
