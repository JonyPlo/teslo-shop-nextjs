import winston from 'winston'

const { transports, createLogger } = winston
const { combine, timestamp, printf, colorize, align } = winston.format

// Global formats
const globalFormats = [
  timestamp({
    format: 'MM-DD-YYYY hh:mm:ss.SSS A',
  }),
  align(),
  printf((info) => `\n[${info.timestamp}]\n${info.level}: ${info.message}`),
]

// Logger
export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.Console({
      format: combine(colorize({ all: true }), ...globalFormats),
    })
  ],
})
