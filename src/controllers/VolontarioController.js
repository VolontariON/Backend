import Volontario from "../models/VolontarioModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// ritorna tutti i volontari
export const getVolontari = async (req, res) => {
  logger.info("getVolontari with status code: " + res.statusCode);
  Volontario.find({})
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      res.status(500).json({ error: "server error" });
      logger.error(err);
    });
};

export const getCurrentVolontario = async (req, res) => {
  try {
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);
    res.status(201).json(user);
    logger.info("getcurrentvolontario: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

// crea nuovo volontario
export const registrazioneVolontario = async (req, res) => {
  logger.info(req.body);
  try {
    const query = Volontario.where({ email: req.body.email });
    const user = await query.findOne();
    if (user) {
      res.status(605).json({ error: "email already registered" });
      logger.error("email già registrata status code: " + res.statusCode);
      return;
    }

    const volontario = new Volontario(req.body);

    await volontario.save();
    res.status(201).json({ response: "OK" });
    logger.info("registrazioneVolontario with status code: " + res.statusCode);
  } catch (error) {
    res.status(500).json({ error: "server error" });
    logger.error("registrazioneVolontario with status code: " + res.statusCode);
  }
};

// login cerco tra volontari o associazioni
export const login = async (req, res) => {
  logger.info(req.body);
  try {
    const { email, password } = req.body;
    const queryVol = Volontario.where({ email: email });
    const user = await queryVol.findOne();
    console.log(user);
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
        logger.info(userData);
        try {
          const token = jwt.sign(userData, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          res.cookie("token", token, { httpOnly: true });
        } catch (err) {
          console.log(err);
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

export const modifyProfilePicture = async (req, res) => {
  try {
    const { image } = req.body;
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);
    user.profilePicture = image;
    await user.save();
    res.status(201).json({ response: "OK" });
    logger.info("image loaded: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

// TODO: crypt password (hash)
//TODO: eliminazione account

// TODO: modfica dati volontario dato un codice fiscale
// mail
// phone
// password

// TODO: add / remove followed associazioni (uso il loro ID)
