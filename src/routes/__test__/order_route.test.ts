import request from 'supertest'
import connect from 'utils/connect'
import app from 'utils/server'

const userInfo = {
  email: 'test@test.com',
  password: 'Password@123'
}
describe('order route', () => {
  afterAll(async () => await connect.end())
  const agent = request.agent(app)
  beforeAll(async () => {
    await agent.post('/api/login').send(userInfo)
  })

  describe('/api/orders', () => {
    test('GET - should return all order infos 200', async () => {
      await agent.get('/api/orders').expect(200)
    })

    test('GET - should return order info by id 200', async () => {
      const {
        body: [{ order_id_pk }]
      } = await agent.get('/api/orders').expect(200)
      const res = await agent.get(`/api/orders/${order_id_pk}`).expect(200)
      expect(res.body[0].order_id_pk).toBe(order_id_pk)
    })
  })
})
