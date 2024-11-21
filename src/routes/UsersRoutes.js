import express from "express";
import {
  getVolontari,
  registrazioneVolontario,
  login,
} from "../controllers/usersController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
const router = express.Router();

router.get("/getVolontari", cookiejwtAuth, getVolontari);
router.post("/registrazioneVolontario", registrazioneVolontario);
router.post("/login", login);

export default router;
