import Volontario from "../models/VolontarioModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
// ritorna tutti i volontari
export const getVolontari = async (req, res) => {
  logger.info("getVolontari with status code: " + res.statusCode);
  // let volontario = await Volontario.find({});
  // console.log(volontario);
  Volontario.find({})
    .then(function (user) {
      res.status(201).json(user);
    })
    .catch(function (err) {
      res.status(500).json({ error: "Errore del server" });
      logger.error(err);
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
    res.status(500).json({ error: "Errore del server" });
    logger.error("registrazioneVolontario with status code: " + res.statusCode);
  }
};

// login cerco tra volontari o associazioni
export const login = async (req, res) => {
  logger.info(req.body);
  const { email, password } = req.body;
  const query = Volontario.where({ email: email });
  const volontario = await query.findOne();
  if (volontario == null) {
    res.status(604).json({ error: "email not found" });
    logger.error("email not found: " + res.status);
  }
  console.log("-->" + volontario);
  if (password != volontario.password) {
    res.status(504).json({ error: "Wrong password" });
    logger.error("password is wrong: " + res.status);
  } else {
    console.log(password);
    /**
     *
     * OK,
     * -> sign JWT
     */
    const volontarioData = volontario.toObject();
    delete volontarioData.password;
    try {
      const token = jwt.sign(volontarioData, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("token", token, { httpOnly: true });
    } catch (err) {
      console.log(err);
    }

    res.status(201).json(volontario);
    logger.info("loginVolontario with status code: " + res.statusCode);
  }
};

//TODO: eliminazione account

// TODO: modfica dati volontario dato un codice fiscale
// mail
// phone
// password

// TODO: add / remove followed associazioni (uso il loro ID)
