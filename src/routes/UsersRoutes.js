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
  deleteAccount,
  changePassword,
  modifyProfile,
  getVolontario,
  getAssociazioniIscritte,
  unsubscribeAssociazione,
  seguiAssociazione,
} from "../controllers/VolontarioController.js";

import { logout } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
const router = express.Router();

router.post("/registrazioneVolontario", registrazioneVolontario);

router.post("/login", login);
router.post("/changePassword", cookiejwtAuth, changePassword);
router.get("/getVolontari", cookiejwtAuth, getVolontari);
router.get("/getVolontario", getVolontario);
router.get("/getAssociazioniIscritte",cookiejwtAuth, getAssociazioniIscritte);
router.post("/unsubscribeAssociazione",cookiejwtAuth, unsubscribeAssociazione);
router.post("/seguiAssociazione", cookiejwtAuth, seguiAssociazione);
router.get("/getCurrentVolontario", cookiejwtAuth, getCurrentVolontario);
router.post("/modifyProfile", cookiejwtAuth, modifyProfile);
router.delete("/deleteAccount", cookiejwtAuth, deleteAccount);
router.get("/logout", cookiejwtAuth, logout);

export default router;
