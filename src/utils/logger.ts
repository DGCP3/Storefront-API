import pino from 'pino'
import pretty from 'pino-pretty'

export const log = pino(
  pretty({
    translateTime: 'yyyy-dd-mm, h:MM:ss TT',
    colorize: true,
    ignore: 'pid,hostname'
  })
)
export const reqLog = pino({ base: undefined }, pino.destination('src/log/req.log'))
