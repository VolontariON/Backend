import mailjet from "node-mailjet";
import "dotenv/config";
import logger from "../utils/logger.js";
import fs from "fs/promises";
import { getConfig } from "../utils/globals.js";
import Associazione from "../models/AssociazioneModel.js";
import jwt from "jsonwebtoken";
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
    logger.info(
      "registrazioneAssociazione with status code: " + res.statusCode
    );
  } catch (error) {
    res.status(500).json({ error: "server error" });
    logger.error(
      "registrazioneAssociazione with status code: " + res.statusCode
    );
    logger.error(error);
  }
};

export const getAssociazioni = async (req, res) => {
  logger.info("GetAssociazioni with status code: " + res.statusCode);
  Associazione.find({}, { password: 0 })
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      res.status(500).json({ error: "server error" });
      logger.error(err);
    });
};

export const login = async (req, res) => {
  // TODO: SWAGGER
  logger.info(req.body);
  try {
    const { email, password } = req.body;
    const queryVol = Associazione.where({ email: email });
    const user = await queryVol.findOne();
    if (!user) {
      res.status(604).json({ error: "email not found" });
      logger.error("email not found: " + res.status);
      return;
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        res.status(500).json({ error: "server error" });
        logger.error("Errore durante il confronto delle password:", err);
        return;
      }
      if (isMatch) {
        // OK -> sign jwt
        const userData = user.toObject();
        delete userData.password;
        delete userData.profilePicture;
        logger.info(userData);
        try {
          const token = jwt.sign(userData, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          logger.info("saoidhsaoidsaiodhsa "+token)
          res.cookie("token", token, { httpOnly: true });
        } catch (err) {
          logger.error(err);
        }
        res.status(201).json({ response: "OK" });
        logger.info("login with status code: " + res.statusCode);
      } else {
        res.status(606).json({ error: "Wrong password" });
        logger.error("login with status code: " + res.statusCode);
      }
    });
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const getCurrentAssociazione = async (req, res) => {
  // *SWAGGER
  try {
    const jwtuserid = req.jwtuser._id;
    logger.info("----------"+jwtuserid);
    const associazione = await Associazione.findById(jwtuserid).select(
      "-password"
    );
    logger.info(associazione);
    const associazioneData = associazione.toObject();
    res.status(201).json(associazioneData);
    logger.info("getCurrentAssociazione: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

// export const getSubAssociazioni = async (req, res) => {
//   // *swagger
//   logger.info("getAssociazioni with status code: " + res.statusCode);
//   try {
//     const jwtuserid = req.jwtuser._id;
//     const user = await Volontario.findById(jwtuserid);
//     const userData = user.toObject();
//     let arrAssociazioni = [];
//     userData.followedAssociations.forEach((association_id) => {
//       arrAssociazioni.push(Associazione.findById(association_id));
//     });
//     res.status(200).json(arrAssociazioni);
//   } catch (err) {
//     res.status(500).json({ error: "server error" });
//     logger.error(err);
//   }
// };

export const getSubAssociazioni = async (req, res) => {
  // *swagger
  logger.info("getSubAssociazioni with status code: " + res.statusCode);
  try {
    const jwtuserid = req.jwtuser._id; // Prendi l'ID dell'utente dal token JWT
    const user = await Volontario.findById(jwtuserid); // Trova l'utente nel database

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = user.toObject();
    const followedAssociations = userData.followedAssociations || []; // Assicurati che esista l'array

    // Recupera i dati di tutte le associazioni seguite dall'utente
    const associations = await Promise.all(
      followedAssociations.map((association_id) =>
        Associazione.findById(association_id)
      )
    );

    // Filtra eventuali null (ad esempio se un ID non corrisponde a un'associazione)
    const validAssociations = associations.filter((assoc) => assoc !== null);

    res.status(200).json(validAssociations);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ error: "server error" });
  }
};

//todo: get all associations that current user is subscribed to (current user in jwt req.jwtuser)
