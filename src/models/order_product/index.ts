import { QueryResult } from 'pg'
import client, { objectToQueryWithAnd, objectToQueryWithComma } from 'utils'

class OrderProductModel {
  select(where?: OrderItem, columns?: (keyof OrderItem)[]): Promise<QueryResult<OrderItem>> {
    return client.query(
      `SELECT ${columns ? columns.join(',') : '*'}
        FROM order_products ${where && `where ${objectToQueryWithAnd(where)}`}`
    )
  }

  create(data: OrderItem) {
    return client.query(
      `INSERT INTO order_products (${Object.keys(data).join(',')}) 
      VALUES (${Object.values(data)
        .map((x) => `'${x}'`)
        .join(',')})`
    )
  }

  update(where: OrderItem, data: OrderItem) {
    return client.query(
      `UPDATE order_products SET ${objectToQueryWithComma(data)} 
      where ${objectToQueryWithAnd(where)} RETURNING *`
    )
  }

  delete(data: OrderItem) {
    return client.query(`DELETE FROM order_products WHERE ${objectToQueryWithAnd(data)}`)
  }
}

export default new OrderProductModel()
