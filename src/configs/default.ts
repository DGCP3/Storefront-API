import dotenv from 'dotenv'
dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  SERVER_PORT,
  NODE_ENV,
  SALT_ROUNDS,
  JWT_TOKEN
} = process.env

export default {
  jwt_token: JWT_TOKEN,
  port: SERVER_PORT,
  round: SALT_ROUNDS,
  env: NODE_ENV,
  db: {
    host: POSTGRES_HOST,
    database: NODE_ENV === 'development' ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  }
}
