import request from 'supertest'
import connect from 'utils/connect'
import app from 'utils/server'

const userInfo = {
  email: 'test@test.com',
  password: 'Password@123'
}

let accountInfo = {
  fullName: 'test user',
  email: 'testEmail@test.com',
  password: 'Password@123'
}
describe('auth routes', () => {
  afterAll(async () => {
    await connect.end()
  })

  describe('POST - /auth/login', () => {
    const agent = request.agent(app)
    test('correct credential - should return 200', async () => {
      const res = await agent.post('/api/login').send(userInfo).expect(200)
      expect(res.headers['set-cookie'][0]).toContain('token')
    })

    test('incorrect credential - should return 401', async () => {
      await agent
        .post('/api/login')
        .send({ ...userInfo, password: 'wrongPassword@123' })
        .expect(401)
    })
  })

  describe('POST - /auth/register', () => {
    const agent = request.agent(app)
    test('correct user info - should return 200', async () => {
      await agent.post('/api/register').send(accountInfo).expect(201)
      await agent.delete('/api/users').expect(200)
    })

    test('invalid user info - should return 400', async () => {
      await agent
        .post('/api/register')
        .send({ ...accountInfo, email: 'invalidEmail' })
        .expect(400)
        .then((res) => {
          expect(res.body.error).toBe('Email is invalid')
        })

      await agent
        .post('/api/register')
        .send({ email: accountInfo['email'] })
        .expect(400)
        .then((res) => {
          expect(res.body.error).toBe('Full name is required')
        })
    })
  })
})
