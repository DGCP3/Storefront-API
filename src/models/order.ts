import { QueryResult } from 'pg'
import client, { objectToQueryWithAnd, objectToQueryWithComma } from 'utils'

type Order = {
  order_id_pk?: number
  order_status?: 'open' | 'processing' | 'completed' | 'cancelled'
  user_id_fk?: number
}

class OrderModel {
  select(where?: Order, columns?: (keyof Order)[]): Promise<QueryResult<Order>> {
    return client.query(
      `SELECT ${columns ? columns.join(',') : '*'}
        FROM orders ${where && `where ${objectToQueryWithAnd(where)}`}`
    )
  }

  create(data: Order): Promise<QueryResult<Order>> {
    return client.query(
      `INSERT INTO orders (${Object.keys(data).join(',')}) 
      VALUES (${Object.values(data)
        .map((x) => `'${x}'`)
        .join(',')}) RETURNING *`
    )
  }

  update(where: Order, data: Order) {
    return client.query(
      `UPDATE orders 
      SET ${objectToQueryWithComma(data)} where ${objectToQueryWithAnd(where)} RETURNING *`
    )
  }

  delete(data: Order) {
    return client.query(`DELETE FROM orders WHERE ${objectToQueryWithAnd(data)} RETURNING *`)
  }
}
export default new OrderModel()
