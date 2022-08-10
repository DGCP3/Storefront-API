import { NextFunction, Request, Response } from 'express'
import { asyncDecorator } from 'utils'
import { AnyZodObject } from 'zod'
import { ErrorResponse } from './error_handler'

export const requestValidator = (schema: AnyZodObject) =>
  asyncDecorator(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      })
      return next()
    } catch (error) {
      throw new ErrorResponse(error.errors[0].message, 400)
    }
  })
