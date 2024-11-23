import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const cookiejwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  logger.info(req.cookies);
  if (!token) {
    return res.status(401).json({ error: "Authentication token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.jwtuser = user;
    next();
  } catch (err) {
<<<<<<< HEAD
    //req.clearCookie("token");
=======
    res.clearCookie("token");
>>>>>>> a7a132e160dc88da05492fab082d1838e3527f76
    logger.error(err);
  }
};
