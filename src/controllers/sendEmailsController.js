import mailjet from "node-mailjet";
import "dotenv/config";
import logger from "../utils/logger.js";
import fs from "fs/promises";
const TEMPLATES_PATH = "src/templates";
const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY_PUBLIC,
  process.env.MAILJET_SECRET_KEY
);

export const registrationEmail = async (email, name, req, res) => {
  try {
    const htmlContent = await fs.readFile(
      `${TEMPLATES_PATH}/email_registration_template.html`,
      "utf-8"
    );

    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL,
            Name: "Volontarion - email",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: "Conferma registrazione",
          TextPart: "email di conferma registrazione",
          HTMLPart: htmlContent,
        },
      ],
    });

    await request;
    logger.info("email sent: " + res.statusCode);
  } catch (err) {
    logger.error(err.message);
  }
};

export const deleteAccountEmail = async (email, name, req, res) => {
  try {
    const htmlContent = await fs.readFile(
      `${TEMPLATES_PATH}/email_deleteAccount_template.html`,
      "utf-8"
    );

    const request = mailjetClient.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDER_EMAIL,
            Name: "Volontarion - email",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: "Account eliminato",
          TextPart: "il tuo account è stato eliminato",
          HTMLPart: htmlContent,
        },
      ],
    });

    await request;
    logger.info("email sent: " + res.statusCode);
  } catch (err) {
    logger.error(err.message);
  }
};
