import config from 'configs/default'
import { Pool } from 'pg'
import { log } from './logger'
const { database, host, password, user } = config.db

const client = new Pool({
  host,
  database,
  user,
  password
})
  .on('error', (err, client) => {
    log.error('Unexpected error on idle client', err)
    process.exit(-1)
  })
  .on('connect', () => {
    log.info(`Connected to ${database} database`)
  })
  .on('remove', () => {
    log.info(`Disconnected from ${database} database`)
  })

export default client
