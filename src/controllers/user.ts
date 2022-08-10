import { Request, Response } from 'express'
import { ErrorResponse } from 'middleware'
import user from 'models/user'
import { asyncDecorator } from 'utils'

export const getUsers = asyncDecorator(async (req: Request, res: Response) => {
  const { userID: user_id_pk } = req.params
  const { rowCount, rows: data } = await user.select(user_id_pk ? { user_id_pk } : undefined, [
    'user_id_pk',
    'user_name'
  ])
  if (!rowCount) throw new ErrorResponse("user doesn't exist", 401)
  res.send(data)
})

export const deleteUser = asyncDecorator(async (req: Request, res: Response) => {
  const { userId: id_pk } = req.params
  const { rowCount } = await user.delete(id_pk)
  if (!rowCount) throw new ErrorResponse("user doesn't exist", 401)
  res.sendStatus(200)
})
