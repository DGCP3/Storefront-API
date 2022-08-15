import bcrypt from 'bcryptjs'
import config from 'configs/default'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import orderModel from 'models/order'

const { jwt_token, round } = config

export const asyncDecorator =
  (fn: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }

export const getOpenOrder = async (userId: number): Promise<number> => {
  const {
    rowCount,
    rows: [data]
  } = await orderModel.select({ user_id_fk: userId, order_status: 'open' })

  if (!rowCount) {
    const {
      rows: [{ order_id_pk }]
    } = await orderModel.create({ user_id_fk: userId, order_status: 'open' })
    return order_id_pk as number
  } else return data.order_id_pk as number
}

export const hashInput = (input: string) => {
  return bcrypt.hashSync(input, bcrypt.genSaltSync(Number(round)))
}

export const compareInput = (input: string, hash: string) => {
  return bcrypt.compareSync(input, hash)
}

export const generateJWToken = (data: object, expiresIn: string = '1h') => {
  return jwt.sign(data, jwt_token as string, { expiresIn })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwt_token as string)
}

export function objectToQueryWithComma<Type, Key extends keyof Type>(obj: Type): string {
  return Object.keys(obj)
    .map((key) => `${key} = '${obj[key as Key]}'`)
    .join(', ')
}

export function objectToQueryWithAnd<Type, Key extends keyof Type>(obj: Type): string {
  return Object.keys(obj)
    .map((key) => `${key} = '${obj[key as Key]}'`)
    .join(' AND ')
}
