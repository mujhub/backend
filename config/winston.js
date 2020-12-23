import appRoot from 'app-root-path';
import winston from 'winston';

const fileFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} ${info.message}`,
  ),
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} ${info.message}`,
  ),
);

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/server.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    format: fileFormat,
  },
  console: {
    level: 'info',
    format: consoleFormat,
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
  ],
  exitOnError: false,
});

if (process.env.ENV === 'dev') {
  logger.add(new winston.transports.Console(options.console));
}

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

export default logger;
