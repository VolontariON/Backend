import Eventi from "../models/EventiModel.js";
import Associazione from "../models/AssociazioneModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  registrationEmail,
  deleteAccountEmail,
} from "./sendEmailsController.js";
import { response } from "express";

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

export const getMyEventi = async (req, res) => {
  // *swagger
  logger.info("getMyEventi with status code: " + res.statusCode);
  const jwtuserid = req.jwtuser._id;
  Eventi.find({ hostAssociation: jwtuserid })
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

    res.status(201).json({response : "ok"});
    logger.info("creaEvento: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const deleteEvent = async (req, res) => {
  // *SWAGGER
  try {
    logger.info("deleteEvent: " + req.body);
    const jwtuserid = req.jwtuser._id;
    const eventId = req.body.eventId;

    var result = await Eventi.findById(eventId);
    if (!result) {
      return res.status(404).json({ error: "Event not found" });
    }

     result = await Associazione.findById(jwtuserid);
    if (!result) {
      return res.status(404).json({ error: "Associazione not found" });
    }

    await Associazione.updateOne(
      { _id: jwtuserid }, // Find the association by its ID
      { $pull: { createdEvents: eventId } } // Remove the eventId from the createdEvents array
    );

    await Eventi.findByIdAndDelete(eventId)

    res.status(201).json({response : "ok"});
    logger.info("deleteEvent: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};
