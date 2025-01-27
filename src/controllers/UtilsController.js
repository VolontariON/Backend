import logger from "../utils/logger.js";
import "dotenv/config";
import { registrationEmail } from "./sendEmailsController.js";

export const checkLoggedIn = (req, res) => {
  try {
    res.status(201).json({ response: "OK" });
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ response: "OK" });
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const sendEmail = (req, res) => {
  registrationEmail("marccs35@gmail.com", "Marco", req, res);
};
