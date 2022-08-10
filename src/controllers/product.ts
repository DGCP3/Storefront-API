import { Request, Response } from 'express'
import { ErrorResponse } from 'middleware'
import productModel from 'models/product'
import { asyncDecorator } from 'utils'

export const getProduct = asyncDecorator(async (req: Request, res: Response) => {
  const { productId } = req.params
  const { rowCount, rows: data } = await productModel.select(
    productId ? { product_id_pk: productId } : undefined,
    ['product_id_pk', 'product_name', 'product_price']
  )
  if (!rowCount) throw new ErrorResponse('product not found', 404)
  res.send(data)
})

export const createProduct = asyncDecorator(async (req: Request, res: Response) => {
  await productModel.create(req.body)
  res.sendStatus(201)
})

export const deleteProduct = asyncDecorator(async (req: Request, res: Response) => {
  const { id } = req.params
  await productModel.delete({ product_id_pk: id })
  res.sendStatus(200)
})

export const updateProduct = asyncDecorator(async (req: Request, res: Response) => {
  const { id } = req.params
  await productModel.update({ product_id_pk: id }, { ...req.body })
  res.sendStatus(202)
})
