import { NextFunction, Request, Response } from 'express'
import orderProduct from 'models/order_products'
import product from 'models/product'
import { asyncDecorator } from 'utils'
import { ErrorResponse } from './error_handler'

export const cartValidator = asyncDecorator(
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId: order_id_fk } = req.user
    const { productId: product_id_fk } = req.body
    if (req.method === 'GET') return next()
    else {
      const { rowCount: orderRowCount } = await product.select({
        product_id_pk: product_id_fk
      })
      if (!orderRowCount) throw new ErrorResponse('product not found', 404)
      if (req.method === 'POST') {
        const { rowCount } = await orderProduct.select({ product_id_fk, order_id_fk })
        if (rowCount) throw new ErrorResponse('Item already in cart', 400)
      }
    }
    return next()
  }
)
