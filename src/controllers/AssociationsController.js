import Associazione from "../models/AssociazioneModel.js";
import Volontario from "../models/VolontarioModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  registrationEmail,
  deleteAccountEmail,
} from "./sendEmailsController.js";

// ritorna tutti i volontari
export const getAssociazioni = async (req, res) => {
  // *swagger
  logger.info("getAssociazioni with status code: " + res.statusCode);
  Associazione.find({})
    .then(function (users) {
      const sanitizedUsers = users.map((user) => {
        const userData = user.toObject();
        delete userData.password;
        return userData;
      });
      res.status(200).json(sanitizedUsers);
    })
    .catch(function (err) {
      res.status(500).json({ error: "server error" });
      logger.error(err);
    });
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
