import { Request, Response } from 'express'
import userModel from 'models/user'
import { ErrorResponse } from 'types/error'
import { asyncDecorator, compareInput, generateJWToken, getOpenOrder, hashInput } from 'utils'

export const login = asyncDecorator(async (req: Request, res: Response) => {
  const { email, password } = req.body
  const {
    rowCount: userCount,
    rows: [user]
  } = await userModel.select({ user_email: email }, ['user_password', 'user_id_pk'])

  if (!userCount || !compareInput(password, user.user_password))
    throw new ErrorResponse('invalid email or password', 401)

  const orderId = await getOpenOrder(user.user_id_pk as number)
  const token = generateJWToken({ userId: user.user_id_pk, orderId })

  res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
  res.sendStatus(200)
})

export const logout = asyncDecorator(async (_req: Request, res: Response) => {
  res.clearCookie('token')
  return res.sendStatus(200)
})

export const createAccount = asyncDecorator(async (req: Request, res: Response) => {
  const { fullName: user_name, email: user_email, password } = req.body
  const { rowCount } = await userModel.select({ user_email })
  if (rowCount) throw new ErrorResponse('Account already exist', 409)
  const {
    rows: [{ user_id_pk }]
  } = await userModel.create({ user_name, user_email, user_password: hashInput(password) })

  const orderId = await getOpenOrder(user_id_pk as number)
  const token = generateJWToken({ userId: user_id_pk, orderId })

  res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
  res.sendStatus(201)
})
