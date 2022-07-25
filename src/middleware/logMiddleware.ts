import { NextFunction, Request, Response } from 'express'

export const reqLogger = (req: Request, res: Response, next: NextFunction) => {
  next()
}
