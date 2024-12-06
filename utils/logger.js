const { existsSync, mkdirSync } = require('fs');

const { join } = require('path');

const winston = require('winston');

const winstonDaily = require('winston-daily-rotate-file');
const { YYYY_MM_DD_HH_mm_ss } = require('../constants');

// logs dir
const logDir = join(__dirname, '../logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf((info) => {
  if (info instanceof Error) {
    return `${info.timestamp} : ${info.level}: ${info.message} ${info.stack}`;
  }
  return `${info.timestamp} : ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: YYYY_MM_DD_HH_mm_ss
    }),
    logFormat
  ),
  transports: [
    // debug log setting

    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/debug`, // log file /logs/debug/*.log in save
      filename: '%DATE%.log',
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true
    }),
    // error log setting

    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: `${logDir}/error`, // log file /logs/error/*.log in save
      filename: '%DATE%.log',
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true
    })
  ]
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize())
  })
);

const stream = {
  write: (message) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  }
};

module.exports = { logger, stream };
