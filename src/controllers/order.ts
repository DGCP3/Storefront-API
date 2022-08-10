import { Request, Response } from 'express'
import { ErrorResponse } from 'middleware'
import order from 'models/order'
import orderDetailsView from 'models/order_details'
import orderItem from 'models/order_products'
import { asyncDecorator } from 'utils'

//-------------------------order-------------------------

export const getOrders = asyncDecorator(async (req: Request, res: Response) => {
  const { userId } = req.user
  console.log(req.user)
  const { rowCount: orderRowCount, rows: data } = await order.select({ user_id_fk: userId }, [
    'order_id_pk',
    'order_status'
  ])
  if (!orderRowCount) throw new ErrorResponse('no order found', 404)
  res.send(data)
})

export const createOrder = asyncDecorator(async (req: Request, res: Response) => {
  const { userId } = req.user
  const {
    rows: [{ order_id_pk }]
  } = await order.create({ user_id_fk: userId, order_status: 'open' })
  res.send({ orderID: order_id_pk })
})

export const getOrderDetails = asyncDecorator(async (req: Request, res: Response) => {
  const { orderID: order_id_fk } = req.user
  const { rows: data, rowCount: orderItemRowCount } = await orderDetailsView.select({
    order_id: order_id_fk
  })
  if (!orderItemRowCount) throw new ErrorResponse('order not found', 404)
  res.send(data)
})

// ------------------------cart------------------------

export const getOrderItems = asyncDecorator(async (req: Request, res: Response) => {
  const { orderId: order_id } = req.user
  console.log(req.user)
  const { rows: data } = await orderDetailsView.select({ order_id }, [
    'product_name',
    'item_number',
    'quantity'
  ])
  res.send(data)
})

export const addOrderItem = asyncDecorator(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body
  const { orderId: order_id_fk } = req.user

  await orderItem.create({ order_id_fk, product_id_fk: productId, quantity })
  res.sendStatus(200)
})

export const deleteOrderItem = asyncDecorator(async (req: Request, res: Response) => {
  const { productId } = req.body
  const { orderId: order_id_fk } = req.user
  await orderItem.delete({ product_id_fk: productId, order_id_fk })
  res.sendStatus(200)
})

export const updateOrderItem = asyncDecorator(async (req: Request, res: Response) => {
  const { productId, quantity } = req.body
  const { orderId: order_id_fk } = req.user
  console.log(req.method, req.body)
  await orderItem.update({ product_id_fk: productId, order_id_fk }, { quantity })
  res.sendStatus(200)
})

export const checkout = asyncDecorator(async (req: Request, res: Response) => {
  const { orderId: order_id_fk } = req.user
  await order.update({ order_id_pk: order_id_fk }, { order_status: 'processing' })
  res.sendStatus(200)
})
