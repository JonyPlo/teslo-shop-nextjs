import winston from 'winston'
import 'winston-daily-rotate-file'

const { format, transports, createLogger } = winston
const { combine, timestamp, printf, colorize, align } = winston.format

// Level filters
const combineFilter = format((info) => {
  return info.level === 'info' || info.level === 'error' ? info : false
})

const errorFilter = format((info) => {
  return info.level === 'error' ? info : false
})

const infoFilter = format((info) => {
  return info.level === 'info' ? info : false
})

// Global formats
const globalFormats = [
  timestamp({
    format: 'MM-DD-YYYY hh:mm:ss.SSS A',
  }),
  align(),
  printf((info) => `\n[${info.timestamp}]\n${info.level}: ${info.message}`),
]

// File rotates
const fileRotateTransport = (
  filename: string,
  datePattern: string,
  maxFiles: string,
  filter: winston.Logform.Format
) => {
  return new transports.DailyRotateFile({
    filename,
    datePattern,
    maxFiles,
    format: combine(filter, ...globalFormats),
  })
}

// Logger
export const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.Console({
      format: combine(colorize({ all: true }), ...globalFormats),
    }),
    // Combined log File
    fileRotateTransport(
      'src/logs/log-files/combined-logs/combined-logs-%DATE%.log',
      'YYYY-MM-DD',
      '14d',
      combineFilter()
    ),
    // Error log File
    fileRotateTransport(
      'src/logs/log-files/error-logs/error-logs-%DATE%.log',
      'YYYY-MM-DD',
      '14d',
      errorFilter()
    ),
    // Info log File
    fileRotateTransport(
      'src/logs/log-files/info-logs/info-logs-%DATE%.log',
      'YYYY-MM-DD',
      '14d',
      infoFilter()
    ),
  ],
})
