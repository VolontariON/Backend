import express from "express";
import {
    getAssociazioni,
    registrazioneAssociazione,
    getCurrentAssociazione,
    login,
    changePassword,
    modifyProfile
} from "../controllers/AssociazioneController.js";

import { logout } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
const router = express.Router();

router.get("/getAssociazioni", getAssociazioni);
router.get("/getCurrentAssociazione", cookiejwtAuth, getCurrentAssociazione);
router.post("/registrazioneAssociazione", registrazioneAssociazione);
router.post("/login", login);
router.post("/changePassword", cookiejwtAuth,changePassword);
router.post("/modifyProfile", cookiejwtAuth, modifyProfile);





export default router;