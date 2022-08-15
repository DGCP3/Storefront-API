import { createProduct, deleteProduct, getProduct, updateProduct } from 'controller/product'
import { Router } from 'express'
import { requestValidator } from 'middleware/request_validator'
import { productSchema } from 'schema'
import { z } from 'zod'
const router = Router()

router
  .route('/')
  .get(getProduct)
  .post(requestValidator(z.object({ body: productSchema })), createProduct)

router
  .route('/:productId')
  .get(getProduct)
  .delete(deleteProduct)
  .patch(requestValidator(z.object({ body: productSchema.partial() })), updateProduct)

export default router
