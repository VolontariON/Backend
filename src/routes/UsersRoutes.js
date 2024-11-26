import express from "express";
import {
  getVolontari,
  registrazioneVolontario,
  login,
  modifyProfilePicture,
  getCurrentVolontario,
  modifyDescription,
  modifySkills,
  getprofilePicture,
} from "../controllers/VolontarioController.js";

import { logout } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
const router = express.Router();

router.post("/registrazioneVolontario", registrazioneVolontario);
router.post("/login", login);
router.get("/getVolontari", cookiejwtAuth, getVolontari);
router.get("/getCurrentVolontario", cookiejwtAuth, getCurrentVolontario);
router.put(
  "/modifyProfilePicture",
  cookiejwtAuth,
  payloadSize,
  modifyProfilePicture
);
router.put("/modifyDescription", cookiejwtAuth, modifyDescription);
router.put("/modifySkills", cookiejwtAuth, modifySkills);
router.get("/logout", cookiejwtAuth, logout);
router.get("/getProfilePicture", cookiejwtAuth, getprofilePicture);

export default router;
