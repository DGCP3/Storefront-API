import request from 'supertest'
import connect from 'utils/connect'
import app from 'utils/server'
describe('/api/products', () => {
  const agent = request.agent(app)
  const product = {
    product_name: 'test',
    product_price: 5
  }

  let productId: number
  afterAll(() => connect.end())
  test('GET - should return all products', async () => {
    await agent.get('/api/products').expect(200)
  })

  test('GET - should return a product with id 1', async () => {
    await agent.get(`/api/products/1`).expect(200)
  })

  test('POST - should create a new product', async () => {
    const { body } = await agent.post('/api/products').send(product).expect(201)
    productId = body.id
  })

  test('PATCH - should update a product', async () => {
    await agent.patch(`/api/products/${productId}`).send({ product_name: 'test2' }).expect(202)
    const {
      body: [{ product_name }]
    } = await agent.get(`/api/products/${productId}`).expect(200)
    expect(product_name).toBe('test2')
  })

  test('DELETE - should delete a product', async () => {
    await agent.delete(`/api/products/${productId}`).expect(200)
  })
})
