import orderModel from 'models/order'
import connect from 'utils'

describe('order model', () => {
  let orderID: number
  afterAll(async () => {
    await orderModel.delete({
      order_id_pk: ~~orderID
    })
    connect.end()
  })
  beforeAll(async () => {
    const {
      rows: [{ order_id_pk }]
    } = await orderModel.create({
      order_status: 'open',
      user_id_fk: 1
    })
    orderID = order_id_pk as number
  })
  test('CRUD functions should be defined', async () => {
    expect(orderModel.create).toBeDefined()
    expect(orderModel.select).toBeDefined()
    expect(orderModel.update).toBeDefined()
    expect(orderModel.delete).toBeDefined()
  })

  test('select', async () => {
    const {
      rows: [{ order_status }]
    } = await orderModel.select({ order_status: 'open' })
    expect(order_status).toBe('open')
  })
  test('update', async () => {
    const {
      rows: [{ order_status }]
    } = await orderModel.update({ order_id_pk: orderID }, { order_status: 'completed' })
    expect(order_status).toBe('completed')
  })
  test('delete', async () => {
    const { rowCount } = await orderModel.delete({ order_id_pk: ~~orderID })
    expect(rowCount).toBe(1)
  })
})
