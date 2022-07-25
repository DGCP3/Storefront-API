import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const { error } = schema.parse(body)
    if (error) {
      return next({ error, status: 400 })
    }
    next()
  }
