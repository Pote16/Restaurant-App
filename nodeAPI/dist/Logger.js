"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dblogger = exports.applogger = void 0;
const winston_1 = __importStar(require("winston"));
const loglevel = process.env.LOGLEVEL || "warning";
const env = process.env.ENV || "dev";
const dateFormat = "YYYY.MM.DD HH:mm:ss";
const myFormat = winston_1.default.format.printf((info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message} ${Object.keys(info.metadata).length ? JSON.stringify(info.metadata) : ""}`);
const logtransports = [
    new winston_1.transports.File({
        filename: "debug.log",
        level: loglevel,
        handleExceptions: true,
        format: winston_1.format.combine(winston_1.format.timestamp({ format: dateFormat }), winston_1.format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"],
        }), myFormat),
    }),
];
const logtransportsdb = [
    new winston_1.transports.File({
        filename: "debugdb.log",
        level: loglevel,
        handleExceptions: true,
        format: winston_1.format.combine(winston_1.format.timestamp({ format: dateFormat }), winston_1.format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"],
        }), myFormat),
    }),
];
if (env !== "production") {
    logtransports.push(new winston_1.transports.Console({
        level: loglevel,
        handleExceptions: true,
        format: winston_1.format.combine(winston_1.format.timestamp({ format: dateFormat }), winston_1.format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"],
        }), winston_1.format.colorize(), myFormat),
    }));
}
exports.applogger = winston_1.loggers.add("app", {
    level: loglevel,
    format: winston_1.format.label({ label: "App" }),
    transports: logtransports,
    exitOnError: false,
});
exports.dblogger = winston_1.loggers.add("database", {
    level: loglevel,
    format: winston_1.format.label({ label: "Database" }),
    transports: logtransportsdb,
    exitOnError: false,
});
//# sourceMappingURL=Logger.js.map