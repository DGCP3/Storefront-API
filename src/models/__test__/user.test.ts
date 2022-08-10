import userModel from 'models/user'
import connect from 'utils'

describe('order model', () => {
  afterAll(() => {
    connect.end()
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
    } = await userModel.select({ user_email: 'test@test.com' }, ['user_id_pk', 'user_password'])
    expect(rowCount).toBe(1)
    expect(data.user_password).toBeDefined()
    expect(data.user_id_pk).toBeDefined()
  })
  test('create', async () => {
    const {
      rows: [{ user_id_pk }]
    } = await userModel.create({
      user_name: 'test',
      user_email: 'test',
      user_password: 'test'
    })
    expect(user_id_pk).toBeDefined()
    await userModel.delete(user_id_pk as string)
  })
  test('update', async () => {
    const {
      rows: [{ user_id_pk }]
    } = await userModel.create({
      user_name: 'test',
      user_email: 'test',
      user_password: 'test'
    })
    const {
      rows: [{ user_name }]
    } = await userModel.update({ user_id_pk }, { user_name: 'test2' })
    expect(user_name).toBe('test2')
    await userModel.delete(user_id_pk as string)
  })
})
