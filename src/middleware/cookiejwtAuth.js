import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const cookiejwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  logger.info("TOKEN: ", token);
  if (!token) {
    return res.status(401).json({ error: "Authentication token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.jwtuser = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    res.status(501).json({ error: "jwtcookie expired" });
    logger.error(err);
  }
};
