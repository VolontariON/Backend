import mailjet from "node-mailjet";
import "dotenv/config";
import logger from "../utils/logger.js";
import fs from "fs/promises";
import { getConfig } from "../utils/globals.js";
import Associazione from '../models/AssociazioneModel.js';
const config = await getConfig();
const TEMPLATES_PATH = "src/templates";
const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_KEY_PUBLIC,
  process.env.MAILJET_SECRET_KEY
);

export const registrazioneAssociazione = async (req, res) => {
  // TODO: SWAGGER
  logger.info(req.body);
  try {
    const query = Associazione.where({ email: req.body.email });
    const user = await query.findOne();
    if (user) {
      res.status(605).json({ error: "email already registered" });
      logger.error("email già registrata status code: " + res.statusCode);
      return;
    }
    const associazione = new Associazione(req.body);
    await associazione.save();
    res.status(201).json({ response: "OK" });
    logger.info("registrazioneAssociazione with status code: " + res.statusCode);
  } catch (error) {
    res.status(500).json({ error: "server error" });
    logger.error("registrazioneAssociazione with status code: " + res.statusCode);
    logger.error(error);
  }
};

export const getAssociazioni = async (req, res) => {
  logger.info("GetAssociazioni with status code: " + res.statusCode);
  Associazione.find({},{password: 0 })
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      res.status(500).json({ error: "server error" });
      logger.error(err);
    });
};
