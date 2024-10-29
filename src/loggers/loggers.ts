import winston from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
)

const expressLogger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    transports: [
        new DailyRotateFile({
            filename: 'express-logger-%DATE%.log',
            dirname: './logs',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '7d',
        }),
    ],
})

export { expressLogger };
