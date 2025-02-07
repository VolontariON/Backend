import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const cookiejwtAuth = (req, res, next) => {
  logger.info("req.headers.authorization: "+req.headers.authorization);
  const token = req.headers.authorization.split(/\s+/).pop();
  logger.info("TOKEN: "+token);
  if (!token) {
    return res.status(401).json({ error: "Authentication token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.jwtuser = user;
    next();
  } catch (err) {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(403).json({ error: "jwtcookie expired" });
    logger.error(err);
  }
};
