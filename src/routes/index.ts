import { Application } from 'express'
import authRoute from './auth'
import orderRoute from './order'
import productRoute from './product'
import userRoute from './user'

export default (app: Application) => {
  app.use('/api', authRoute)
  app.use('/api/users', userRoute)
  app.use('/api/products', productRoute)
  app.use('/api/orders', orderRoute)
}
