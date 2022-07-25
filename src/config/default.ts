import dotenv from 'dotenv'
dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  SERVER_PORT,
  ENV,
  SALT_ROUNDS,
  JWT_TOKEN
} = process.env

export default {
  jwt_token: JWT_TOKEN,
  port: SERVER_PORT,
  round: SALT_ROUNDS,
  env: ENV,
  db: {
    host: POSTGRES_HOST,
    database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  }
}
