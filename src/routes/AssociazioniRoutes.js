import express from "express";
import {
    getAssociazioni,
    registrazioneAssociazione
} from "../controllers/AssociazioneController.js";

import { logout } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
const router = express.Router();

router.get("/getAssociazioni", getAssociazioni);
router.post("/registrazioneAssociazione", registrazioneAssociazione);



export default router;