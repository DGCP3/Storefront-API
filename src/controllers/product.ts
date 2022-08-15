import { Request, Response } from 'express'
import productModel from 'models/product'
import { ErrorResponse } from 'types/error'
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
  const {
    rows: [{ product_id_pk }]
  } = await productModel.create(req.body)
  res.status(201).send({ id: product_id_pk })
})

export const deleteProduct = asyncDecorator(async (req: Request, res: Response) => {
  const { productId } = req.params
  await productModel.delete({ product_id_pk: productId })
  res.sendStatus(200)
})

export const updateProduct = asyncDecorator(async (req: Request, res: Response) => {
  const { productId } = req.params

  await productModel.update({ product_id_pk: productId }, { ...req.body })
  res.sendStatus(202)
})
