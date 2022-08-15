import request from 'supertest'
import connect from 'utils/connect'
import app from 'utils/server'

const userInfo = {
  email: 'test@test.com',
  password: 'Password@123'
}
const productInfo = {
  productId: 1,
  quantity: 20
}
const agent = request.agent(app)

afterAll(async () => {
  await connect.end()
})
beforeEach(async () => {
  await agent.post('/api/login').send(userInfo)
})
describe('/api/users', () => {
  test('GET - should return users', async () => {
    await agent.get('/api/users').expect(200)
  })
  test('GET - should return user by id', async () => {
    await agent.get('/api/users/1').expect(200)
  })
})

describe('/api/users/order', () => {
  let orderId: number
  test('GET - should return user orders', async () => {
    const {
      body: [{ order_id_pk }]
    } = await agent.get('/api/users/orders').expect(200)
    orderId = order_id_pk
  })
  test('GET - should return user order by id', async () => {
    await agent.get(`/api/users/orders/${orderId}`).expect(200)
  })
})

describe('/api/users/cart', () => {
  test('GET - should return user cart', async () => {
    await agent.get('/api/users/cart').expect(200)
  })
  test('POST - should add item to cart 201', async () => {
    await agent.post('/api/users/cart').send(productInfo).expect(200)
  })
  test('PATCH - should update item in cart', async () => {
    await agent.patch('/api/users/cart').send(productInfo).expect(200)
  })
  test('DELETE - should delete item from cart', async () => {
    await agent.delete('/api/users/cart').send({ productId: 1 }).expect(200)
  })
})

describe('/api/uses/order/:orderID/products 200', () => {
  beforeEach(async () => {
    await agent.post('/api/users/cart').send(productInfo)
  })
  afterEach(async () => {
    await agent.delete('/api/users/cart').send({ productId: 1 })
  })

  test('GET - should return order details 200', async () => {
    const {
      body: [{ order_id_pk }]
    } = await agent.get('/api/users/orders')
    const {
      body: [data]
    } = await agent.get(`/api/users/orders/${order_id_pk}/products`).expect(200)
    expect(data).toBeDefined()
  })
})
