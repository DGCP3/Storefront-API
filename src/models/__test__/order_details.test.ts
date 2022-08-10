import orderDetails from 'models/order_details'
import connect from 'utils'
describe('order model', () => {
  afterAll(() => {
    connect.end()
  })

  test('select functions should be defined', async () => {
    expect(orderDetails.select).toBeDefined()
  })
})
