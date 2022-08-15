import { QueryResult } from 'pg'
import client, { objectToQueryWithAnd } from 'utils'

class OrderDetailsView {
  select(
    param?: Partial<OrderDetails>,
    columns?: (keyof OrderDetails)[]
  ): Promise<QueryResult<OrderDetails>> {
    return client.query(
      `SELECT ${columns ? columns.join(',') : '*'} 
      FROM order_details_view ${param && `where ${objectToQueryWithAnd(param)}`}`
    )
  }
}
export default new OrderDetailsView()
