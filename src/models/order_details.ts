import { QueryResult } from 'pg'
import client, { objectToQueryWithAnd } from 'utils'

type OrderDetails = {
  item_number: string
  order_id: string
  order_status: string
  product_name: string
  product_price: string
  user_id: string
  quantity: string
}
class OrderDetailsView {
  select(
    param?: Partial<OrderDetails>,
    columns?: (keyof OrderDetails)[]
  ): Promise<QueryResult<OrderDetails>> {
    return client.query(
      `SELECT ${columns ? columns.join(',') : '*'} FROM order_details_view ${
        param && `where ${objectToQueryWithAnd(param)}`
      }`
    )
  }
}
export default new OrderDetailsView()
