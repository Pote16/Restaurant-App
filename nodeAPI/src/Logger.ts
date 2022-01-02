import winston, { format, loggers, transports } from "winston";
import * as Transport from "winston-transport";

const loglevel = process.env.LOGLEVEL || "warning";
const env = process.env.ENV || "dev";
const dateFormat = "YYYY.MM.DD HH:mm:ss";

const myFormat = winston.format.printf(
  (info) =>
    `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${
      Object.keys(info.metadata).length ? JSON.stringify(info.metadata) : ""
    }`
);

const logtransports: Transport[] = [
  new transports.File({
    filename: "debug.log",
    level: loglevel,
    handleExceptions: true,
    format: format.combine(
      format.timestamp({ format: dateFormat }),
      format.metadata({
        fillExcept: ["message", "level", "timestamp", "label"],
      }),
      myFormat
    ),
  }),
];

const logtransportsdb: Transport[] = [
  new transports.File({
    filename: "debugdb.log",
    level: loglevel,
    handleExceptions: true,
    format: format.combine(
      format.timestamp({ format: dateFormat }),
      format.metadata({
        fillExcept: ["message", "level", "timestamp", "label"],
      }),
      myFormat
    ),
  }),
];

if (env !== "production") {
  logtransports.push(
    new transports.Console({
      level: loglevel,
      handleExceptions: true,
      format: format.combine(
        format.timestamp({ format: dateFormat }),
        format.metadata({
          fillExcept: ["message", "level", "timestamp", "label"],
        }),
        format.colorize(),
        myFormat
      ),
    })
  );
}

export const applogger = loggers.add("app", {
  level: loglevel,
  format: format.label({ label: "App" }),
  transports: logtransports,
  exitOnError: false,
});

export const dblogger = loggers.add("database", {
  level: loglevel,
  format: format.label({ label: "Database" }),
  transports: logtransportsdb,
  exitOnError: false,
});

