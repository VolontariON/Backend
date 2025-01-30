import Volontario from "../models/VolontarioModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import {
  registrationEmail,
  deleteAccountEmail,
} from "./sendEmailsController.js";

// ritorna tutti i volontari
export const getVolontari = async (req, res) => {
  // *swagger
  logger.info("getVolontari with status code: " + res.statusCode);
  Volontario.find({})
    .then(function (users) {
      const usersWithoutPassword = users.map((user) => {
        const userData = user.toObject();
        delete userData.password;
        return userData;
      });
      res.status(201).json(usersWithoutPassword);
    })
    .catch(function (err) {
      res.status(500).json({ error: "server error" });
      logger.error(err);
    });
};

export const getCurrentVolontario = async (req, res) => {
  // *SWAGGER
  try {
    const jwtuserid = req.jwtuser._id;
    logger.info(jwtuserid);
    const user = await Volontario.findById(jwtuserid).select("-password");
    const userData = user.toObject();
    res.status(201).json(userData);
    logger.info("getcurrentvolontario: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

// crea nuovo volontario
export const registrazioneVolontario = async (req, res) => {
  // TODO: SWAGGER
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
    await registrationEmail(volontario.email, volontario.name, req, res);
    res.status(201).json({ response: "OK" });
    logger.info("registrazioneVolontario with status code: " + res.statusCode);
  } catch (error) {
    res.status(500).json({ error: "server error" });
    logger.error("registrazioneVolontario with status code: " + res.statusCode);
    logger.error(error);
  }
};

export const login = async (req, res) => {
  // TODO: SWAGGER
  logger.info(req.body);
  try {
    const { email, password } = req.body;
    const queryVol = Volontario.where({ email: email });
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

export const modifyProfilePicture = async (req, res) => {
  // TODO: SWAGGER
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

export const modifyDescription = async (req, res) => {
  try {
    const { description } = req.body;
    //get current user
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);
    user.description = description;
    await user.save();
    res.status(201).json({ response: "OK" });
    logger.info("user descriptin modified: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const modifySkills = async (req, res) => {
  try {
    const { skills } = req.body;
    //get current user
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);
    user.skills = skills;
    await user.save();
    res.status(201).json({ response: "OK" });
    logger.info("user skills modified: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const modifyProfile = async (req, res) => {
  try {
    //get current user
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);

    Object.entries(req.body.data).forEach(([key, value]) => {
      user[key] = value;
    });
    await user.save();
    res.status(201).json({ response: "OK" });
    logger.info("user profile modified: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const getprofilePicture = async (req, res) => {
  try {
    //get current user
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);
    res.status(201).json(user.profilePicture);
    logger.info("get profilePicture: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const deleteAccount = async (req, res) => {
  try {
    //get current user
    const jwtuserid = req.jwtuser._id;
    const user = await Volontario.findById(jwtuserid);
    let email = user.email;
    let name = user.name;
    await Volontario.deleteOne({ _id: jwtuserid });
    deleteAccountEmail(email, name, req, res);
    res.status(201).json({ response: "OK" });
    logger.info("deleted account: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

export const changePassword = async (req, res) => {
  // *SWAGGER
  try {
    const jwtuserid = req.jwtuser._id;
    const volontario = await Volontario.findById(jwtuserid);
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    volontario.comparePassword(password, async (err, isMatch) => {
      if (err) {
        res.status(500).json({ error: "server error" });
        logger.error("Errore durante il confronto delle password:", err);
        return;
      }

      if (isMatch) {
        volontario.password = newPassword;
        await volontario.save();
        res.status(201).json({ res: "OK" })
      } else {
        res.status(606).json({ error: "Wrong password" });
        logger.error("login with status code: " + res.statusCode);
      }
    });

    logger.info("changePassword: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};

// TODO: modfica dati volontario dato un codice fiscale
// mail
// phone
// password

// TODO: add / remove followed associazioni (uso il loro ID)
