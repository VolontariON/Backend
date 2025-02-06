import express from "express";
import {
    getAssociazioni,
    registrazioneAssociazione,
    getCurrentAssociazione,
    login,
    changePassword,
    modifyProfile,
    getAssociazione,
    getVolontariIscrittiEvento,
    getEventiAssociazione
} from "../controllers/AssociazioneController.js";

import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
const router = express.Router();
router.get("/getAssociazione", getAssociazione);
router.get("/getVolontariIscrittiEvento",cookiejwtAuth, getVolontariIscrittiEvento);
router.get("/getEventiAssociazione", getEventiAssociazione);
router.get("/getAssociazioni", getAssociazioni);
router.get("/getCurrentAssociazione", cookiejwtAuth, getCurrentAssociazione);
router.post("/registrazioneAssociazione", registrazioneAssociazione);
router.post("/login", login);
router.post("/changePassword", cookiejwtAuth,changePassword);
router.post("/modifyProfile", cookiejwtAuth, modifyProfile);

export default router;