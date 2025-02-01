import pino from "pino";
const level = process.env.NODE_ENV === "production" ? "error" : "debug";
const logger = pino({ level });
export default logger;
