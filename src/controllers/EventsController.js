import Eventi from "../models/EventiModel.js";
import Associazione from "../models/AssociazioneModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  registrationEmail,
  deleteAccountEmail,
} from "./sendEmailsController.js";

// ritorna tutti i volontari
export const getEventi = async (req, res) => {
  // *swagger
  logger.info("getAssociazioni with status code: " + res.statusCode);
  Eventi.find({})
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      res.status(500).json({ error: "server error" });
      logger.error(err);
    });
};


export const creaEvento = async (req, res) => {
  // *SWAGGER
  try {
    logger.info("creaEvento: " + req.body);

    const jwtuserid = req.jwtuser._id;
    const associazione = await Associazione.findById(jwtuserid).select(
    );

    const evento = new Eventi(req.body);
    evento.hostAssociation = jwtuserid;
    await evento.save();

    associazione.createdEvents.push(evento.id);

    await associazione.save();

    res.status(201).json(evento);
    logger.info("creaEvento: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};