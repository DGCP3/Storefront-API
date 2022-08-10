import { getOrders } from 'controllers/order'
import { Router } from 'express'
import { cookieValidator } from 'middleware'

const router = Router()

router.route('/').get(cookieValidator, getOrders)
router.route('/:orderID').get(cookieValidator, getOrders)

export default router
