import userModel from 'models/user'
import connect from 'utils/connect'

describe('order model', () => {
  let userId: any
  afterAll(async () => {
    await connect.end()
  })
  beforeEach(async () => {
    const {
      rows: [{ user_id_pk }]
    } = await userModel.create({
      user_name: 'test',
      user_email: 'test',
      user_password: 'test'
    })
    userId = user_id_pk
  })
  afterEach(async () => {
    await userModel.delete(userId as number)
  })

  test('CRUD functions should be defined', async () => {
    expect(userModel.create).toBeDefined()
    expect(userModel.select).toBeDefined()
    expect(userModel.update).toBeDefined()
    expect(userModel.delete).toBeDefined()
  })

  test('select', async () => {
    const {
      rowCount,
      rows: [data]
    } = await userModel.select({ user_email: 'test' }, ['user_id_pk', 'user_password'])
    expect(rowCount).toBe(1)
    expect(data.user_password).toBeDefined()
    expect(data.user_id_pk).toBeDefined()
  })

  test('update', async () => {
    const {
      rows: [{ user_name }]
    } = await userModel.update({ user_id_pk: userId }, { user_name: 'test2' })
    expect(user_name).toBe('test2')
  })
})
