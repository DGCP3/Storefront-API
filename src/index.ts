import config from 'configs/default'
import client, { log } from 'utils'
import app from 'utils/server'

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
