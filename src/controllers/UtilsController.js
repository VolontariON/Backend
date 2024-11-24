import Image from "../models/imageModel.js";
import logger from "../utils/logger.js";
import mailjet from "node-mailjet";
import "dotenv/config";

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    const imgObj = new Image(req.body);
    await imgObj.save();
    res.status(201).json({ response: "OK" });
    logger.info("image loaded: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const checkLoggedIn = async (req, res) => {
  try {
    res.status(201).json({ response: "OK" });
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ response: "OK" });
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const sendEmail = async (req, res) => {
  const mailjetClient = mailjet.apiConnect(
    process.env.MAILJET_API_KEY_PUBLIC,
    process.env.MAILJET_SECRET_KEY
  );

  const request = mailjetClient.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "marccs35@gmail.com",
          Name: "Mailjet Pilot",
        },
        To: [
          {
            Email: "marccs35@gmail.com",
            Name: "passenger 1",
          },
        ],
        Subject: "TEST",
        TextPart: "TEST ONE",
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  });

  request
    .then((result) => {
      res.status(201).json(result);
      logger.info(result.body);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
      logger.info(err.message);
    });
};
