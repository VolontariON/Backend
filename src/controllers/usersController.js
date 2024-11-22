import Volontario from "../models/VolontarioModel.js";
import Associazione from "../models/AssociazioneModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

// ritorna tutti i volontari
export const getVolontari = async (req, res) => {
  logger.info("getVolontari with status code: " + res.statusCode);
  // let volontario = await Volontario.find({});
  // console.log(volontario);
  Volontario.find({})
    .then(function (users) {
      res.status(201).json(users);
    })
    .catch(function (err) {
      res.status(500).json({ error: "server error" });
      logger.error(err);
    });
};

// crea nuovo volontario
export const registrazioneVolontario = async (req, res) => {
  logger.info(req.body);
  try {
    const query = Volontario.where({ email: req.body.email });
    const user = await query.findOne();
    if (user) {
      res.status(605).json({ error: "email già registrata" });
      logger.error("email già registrata status code: " + res.statusCode);
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
  const { email, password } = req.body;
  const queryVol = Volontario.where({ email: email });
  const userVol = await queryVol.findOne();
  const queryAss = Associazione.where({ email: email });
  const userAss = await queryAss.findOne();
  let user = null;
  if (userVol != null) {
    user = userVol;
  } else if (userAss != null) {
    user = userAss;
  } else {
    res.status(604).json({ error: "email not found" });
    logger.error("email not found: " + res.status);
  }

  if (password != user.password) {
    res.status(606).json({ error: "Wrong password" });
    logger.error("password is wrong: " + res.status);
  } else {
    /**
     *
     * OK,
     * -> sign JWT
     */
    const userData = user.toObject();
    delete userData.password;
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
  }
};

export const modifyProfilePicture = async (req, res) => {
  try {
    const { pimage } = req.body;
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);
    user.profilePicture = pimage;
    await user.save();
    res.status(201).json({ response: "OK" });
    logger.info("image loaded: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

//TODO: eliminazione account

// TODO: modfica dati volontario dato un codice fiscale
// mail
// phone
// password

// TODO: add / remove followed associazioni (uso il loro ID)
