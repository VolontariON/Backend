import logger from "../utils/logger.js";
import "dotenv/config";

export const payloadSize = (req, res, next) => {
  const contentLength = req.headers["content-length"];
  logger.info(
    "payload size for: " +
      req.originalUrl +
      " is: " +
      parseInt(contentLength) +
      " Byte"
  );
  next();
};
