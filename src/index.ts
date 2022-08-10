import config from 'configs/default'
import { Request, Response } from 'express'
import { errorHandler } from 'middleware'
import routes from 'routes'
import app from 'server'
import client, { log } from 'utils'

routes(app)
app.get('/', (_req: Request, res: Response) => res.sendStatus(200))
app.use(errorHandler)

function init() {
  client
    .connect()
    .then(() => {
      app
        .listen(config.port, () => log.info(`Server is running on port ${config.port}`))
        .on('error', (err) => log.error(err.message))
    })
    .catch(() => log.error('Docker is down: run `docker-compose up`'))
}

process.on('unhandledRejection', (err) => {
  log.error(err)
  process.exit(1)
})

init()
