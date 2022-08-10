import {
  addOrderItem,
  deleteOrderItem,
  getOrderDetails,
  getOrderItems,
  getOrders,
  updateOrderItem
} from 'controllers/order'
import { getUsers } from 'controllers/user'
import { Router } from 'express'
import { cartValidator, cookieValidator } from 'middleware'

const router = Router()

// order
router.route('/orders').get(cookieValidator, getOrders)
router.route('/orders/products').get(cookieValidator, getOrderDetails)
router.route('/orders/:orderID/products').get(getOrderDetails)
// cart
router
  .route('/cart')
  .all(cookieValidator, cartValidator)
  .get(getOrderItems)
  .post(addOrderItem)
  .delete(deleteOrderItem)
  .patch(updateOrderItem)
// user details
router.route('/').get(getUsers)
router.route('/:userID').get(getUsers)

export default router
