import express from "express";
import {
  getVolontari,
  registrazioneVolontario,
  login,
  modifyProfilePicture,
  checkLoggedIn,

} from "../controllers/usersController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
const router = express.Router();

router.get("/getVolontari", cookiejwtAuth, getVolontari);
router.get("/checkLoggedIn", cookiejwtAuth, checkLoggedIn);
router.post("/registrazioneVolontario", registrazioneVolontario);
router.post("/login", login);
router.post("/modifyProfilePicture", cookiejwtAuth, modifyProfilePicture);





export default router;
