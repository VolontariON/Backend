import Volontario from "../models/VolontarioModel.js";
import logger from "../utils/logger.js";

// ritorna tutti i volontari
export const getVolontari = async (req, res) => {
  logger.info("getVolontari with status code: " + res.statusCode);
  Volontario.find({})
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      console.log(err);
    });
};

// crea nuovo volontario
export const registrazioneVolontario = async (req, res) => {
  logger.info(req.body);
  try {
    const volontario = new Volontario(req.body);
    await volontario.save();
    res.status(201).json(volontario);
    logger.info("registrazioneVolontario with status code: " + res.statusCode);
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione del volontario" });
    logger.error("registrazioneVolontario with status code: " + res.statusCode);
  }
};

// login volontario
export const loginVolontario = (req, res) => {
  logger.info(req.body);
  try {
    const { email, password } = req.body;
    Volontario.findOne({ email: email })
      .then(function (user) {
        if (user.password == password) {
          console.log(user.password);
        }
        res.status(201).json(user);
        logger.info("loginVolontario with status code: " + res.statusCode);
      })
      .catch(function (err) {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione del volontario" });
    logger.error("loginVolontario with status code: " + res.statusCode);
  }
};

//TODO: eliminazione account

// TODO: modfica dati volontario dato un codice fiscale
// mail
// phone
// password

// TODO: add / remove followed associazioni (uso il loro ID)
