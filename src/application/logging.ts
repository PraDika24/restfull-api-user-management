import winston, { format } from "winston";

export const logger = winston.createLogger({
    level: "debug",
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level}: ${message}`;
          })
    ),
    transports: [
        new winston.transports.Console({})
    ]

});