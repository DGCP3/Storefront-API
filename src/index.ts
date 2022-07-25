import { Request, Response } from 'express'
import userRoute from 'routes/routes'
import { errorHandler } from '@middleware/index'
import { log } from '@utils/logger'
import config from '@config/default'
import app from 'server'

const PORT = config.port
userRoute(app)
app.use(errorHandler)
app
  .get('/', (req: Request, res: Response) => {
    res.sendStatus(200)
  })
  .listen(PORT, () => {
    log.info(`Server is running on port ${PORT}`)
  })
  .on('error', (err) => {
    log.error(err.message)
  })

process.on('unhandledRejection', (err) => {
  log.error(err)
  process.exit(1)
})
