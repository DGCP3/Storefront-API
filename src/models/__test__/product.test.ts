import productMode from 'models/product'
import connect from 'utils'
describe('order model', () => {
  afterAll(() => {
    connect.end()
  })

  test('CRUD functions should be defined', async () => {
    expect(productMode.create).toBeDefined()
    expect(productMode.select).toBeDefined()
    expect(productMode.update).toBeDefined()
    expect(productMode.delete).toBeDefined()
  })

  test('select product', async () => {
    const {
      rowCount,
      rows: [{ product_price, product_desc }]
    } = await productMode.select({ product_name: 'Product 1' }, ['product_price', 'product_desc'])
    expect(rowCount).toBe(1)
    expect(product_price).toBeDefined()
    expect(product_desc).toBeDefined()
  })

  test('create product', async () => {
    const {
      rows: [{ product_id_pk }]
    } = await productMode.create({
      product_name: 'test',
      product_desc: 'test',
      product_price: '10.00'
    })
    expect(product_id_pk).toBeDefined()
    await productMode.delete({ product_id_pk })
  })

  test('update product', async () => {
    const {
      rows: [{ product_id_pk }]
    } = await productMode.create({
      product_name: 'test product',
      product_desc: 'desc',
      product_price: '10.00'
    })
    const {
      rows: [{ product_name }]
    } = await productMode.update({ product_id_pk }, { product_name: 'test product updated' })
    expect(product_name).toBe('test product updated')
    await productMode.delete({ product_id_pk })
  })
})
