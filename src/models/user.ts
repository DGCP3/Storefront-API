import { QueryResult } from 'pg'
import client, { objectToQueryWithAnd, objectToQueryWithComma } from 'utils'

export type User = {
  user_id_pk?: number
  user_name: string
  user_email: string
  user_password: string
}

class UserModel {
  select(where?: Partial<User>, returnColumns?: (keyof User)[]): Promise<QueryResult<User>> {
    return client.query(
      `SELECT ${returnColumns ? returnColumns.join(',') : '*'} FROM users
        ${where && `where  ${objectToQueryWithComma(where)}`}`
    )
  }

  create(param: User): Promise<QueryResult<User>> {
    return client.query(
      `INSERT INTO users (${Object.keys(param).join(',')}) VALUES (${Object.values(param)
        .map((v) => `'${v}'`)
        .join(',')}) Returning *`
    )
  }

  update(where: Partial<User>, data: Partial<User>) {
    return client.query(
      `UPDATE users 
      SET ${objectToQueryWithComma(data)} where ${objectToQueryWithAnd(where)} RETURNING *`
    )
  }

  delete(id: number): Promise<any> {
    return client.query(`DELETE FROM users WHERE  user_id_pk = ${id}`)
  }
}

export default new UserModel()
