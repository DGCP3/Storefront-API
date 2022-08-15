import { getOrders } from 'controllers/order'
import { Router } from 'express'
const router = Router()

router.route('/').get(getOrders)
router.route('/:orderID').get(getOrders)

export default router
