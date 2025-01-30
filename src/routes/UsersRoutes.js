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
} from "../controllers/VolontarioController.js";

import { logout } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
import {
  //AssociazioniRoutes?
  getAssociazioni,
  //
  getSubAssociazioni,
} from "../controllers/AssociazioneController.js";
const router = express.Router();

router.post("/registrazioneVolontario", registrazioneVolontario);
router.post("/registrazioneAssociazione", registrazioneAssociazione);
router.post("/login", login);
router.post("/changePassword", cookiejwtAuth, changePassword);
router.get("/getVolontari", cookiejwtAuth, getVolontari);
router.get("/getAssociazioni", cookiejwtAuth, getAssociazioni);
router.get("/getSubAssociazioni", cookiejwtAuth, getSubAssociazioni);

router.get("/getCurrentVolontario", cookiejwtAuth, getCurrentVolontario);
router.put(
  "/modifyProfilePicture",
  cookiejwtAuth,
  payloadSize,
  modifyProfilePicture
);
router.put("/modifyDescription", cookiejwtAuth, modifyDescription);
router.put("/modifySkills", cookiejwtAuth, modifySkills);
router.post("/modifyProfile", cookiejwtAuth, modifyProfile);
router.delete("/deleteAccount", cookiejwtAuth, deleteAccount);
router.get("/logout", cookiejwtAuth, logout);
router.get("/getProfilePicture", cookiejwtAuth, getprofilePicture);

export default router;
