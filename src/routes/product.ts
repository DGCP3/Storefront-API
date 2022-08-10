import { createProduct, deleteProduct, getProduct, updateProduct } from 'controller/product'
import { Router } from 'express'
const router = Router()

router.route('/').get(getProduct).post(createProduct)
router.route('/:productId').get(getProduct).delete(deleteProduct).patch(updateProduct)

export default router
