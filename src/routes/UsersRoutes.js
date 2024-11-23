import express from "express";
import {
  getVolontari,
  registrazioneVolontario,
  login,
  modifyProfilePicture,
  getCurrentVolontario,
} from "../controllers/VolontarioController.js";

import { logout } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
const router = express.Router();

router.post("/registrazioneVolontario", registrazioneVolontario);
router.post("/login", login);
router.get("/getVolontari", cookiejwtAuth, getVolontari);
router.get("/getCurrentVolontario", cookiejwtAuth, getCurrentVolontario);
router.post("/modifyProfilePicture", cookiejwtAuth, modifyProfilePicture);
router.get("/logout", cookiejwtAuth, logout);

export default router;
