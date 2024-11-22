import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const cookiejwtAuth = (req, res, next) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.jwtuser = user;
    next();
  } catch (err) {
    req.clearCookie("token");
    logger.error(err);
  }
};
