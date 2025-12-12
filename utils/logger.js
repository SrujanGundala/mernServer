import winston from "winston";
const { timestamp, combine, printf } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    printf((info) => `${info.timestamp} ${info.level} ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "debug.log", level: "error" }),
  ],
});
