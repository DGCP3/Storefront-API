import { QueryResult } from 'pg'
import client, { objectToQueryWithAnd, objectToQueryWithComma } from 'utils'

export type Product = {
  product_id_pk?: string
  product_name: string
  product_desc: string
  product_price: string
}

class ProductModel {
  select(
    param?: Partial<Product>,
    returnColumns?: (keyof Product)[]
  ): Promise<QueryResult<Product>> {
    return client.query(
      `SELECT ${returnColumns ? returnColumns.join(',') : '*'}  
      FROM products ${param && `WHERE ${objectToQueryWithAnd(param)}`}`
    )
  }

  create(data: Product): Promise<QueryResult<Product>> {
    return client.query(
      `INSERT INTO products (${Object.keys(data).join(',')}) VALUES (${Object.values(data)
        .map((x) => `'${x}'`)
        .join(',')}) returning *`
    )
  }

  update(where: Partial<Product>, data: Partial<Product>): Promise<QueryResult<Product>> {
    return client.query(
      `UPDATE products SET ${objectToQueryWithComma(data)} 
      where ${objectToQueryWithComma(where)} returning *`
    )
  }

  delete(data: Partial<Product>) {
    return client.query(`DELETE FROM products WHERE ${objectToQueryWithComma(data)}`)
  }
}

export default new ProductModel()
