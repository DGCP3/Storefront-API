import { NextFunction, Request, Response } from 'express'

export const cookieValidator = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.token) {
    next()
  } else {
    res.status(401).json({
      message: 'Unauthorized'
    })
  }
}
