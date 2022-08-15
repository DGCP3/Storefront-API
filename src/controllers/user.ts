import { Request, Response } from 'express'
import order from 'models/order'
import user from 'models/user'
import { ErrorResponse } from 'types/error'
import { asyncDecorator } from 'utils'

export const getUsers = asyncDecorator(async (req: Request, res: Response) => {
  const { userId } = req.params
  const { rowCount, rows: data } = await user.select(
    userId ? { user_id_pk: ~~userId } : undefined,
    ['user_id_pk', 'user_name']
  )
  if (!rowCount) throw new ErrorResponse("user doesn't exist", 401)
  res.send(data)
})

export const deleteUser = asyncDecorator(async (req: Request, res: Response) => {
  const { userId: id_pk } = req.params
  const { rowCount } = await user.delete(~~id_pk)
  if (!rowCount) throw new ErrorResponse("user doesn't exist", 401)
  res.sendStatus(200)
})

export const getUserOrders = asyncDecorator(async (req: Request, res: Response) => {
  const { userId } = req.user
  const { orderID } = req.params
  const { rowCount: orderRowCount, rows: data } = await order.select(
    { user_id_fk: ~~userId, ...(orderID && { order_id_pk: ~~orderID }) },
    ['order_id_pk', 'order_status']
  )
  if (!orderRowCount) throw new ErrorResponse('no order found', 404)
  res.send(data)
})

export const deleteAccount = asyncDecorator(async (req: Request, res: Response) => {
  const { userId } = req.user
  const { rowCount } = await user.delete(~~userId)
  if (!rowCount) throw new ErrorResponse("user doesn't exist", 401)
  res.sendStatus(200)
})
