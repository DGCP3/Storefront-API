import {
  addOrderItem,
  deleteOrderItem,
  getOrderDetails,
  getOrderItems,
  getUserOrders,
  updateOrderItem
} from 'controllers/order'
import { deleteAccount, getUsers } from 'controllers/user'
import { Router } from 'express'
import { cartValidator, cookieValidator } from 'middleware'

const router = Router()

// order
router.route('/orders').get(cookieValidator, getUserOrders)
router.route('/orders/:orderId/products').get(cookieValidator, getOrderDetails)
router.route('/orders/:orderId').get(cookieValidator, getUserOrders)
// cart
router
  .route('/cart')
  .all(cookieValidator, cartValidator)
  .get(getOrderItems)
  .post(addOrderItem)
  .delete(deleteOrderItem)
  .patch(updateOrderItem)
// user details
router.route('/').get(getUsers).delete(cookieValidator, deleteAccount)
router.route('/:userId').get(getUsers)

export default router
