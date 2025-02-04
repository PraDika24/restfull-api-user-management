import winston, { format } from "winston";

export const logger = winston.createLogger({
    level: "debug",
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.prettyPrint()
    ),
    transports: [
        new winston.transports.Console({})
    ]

});