import express from "express";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
import { getEventi } from "../controllers/EventsController.js";
import { creaEvento } from "../controllers/EventsController.js";
const router = express.Router();

router.get("/getEventi", cookiejwtAuth, getEventi);
router.post("/creaEvento", cookiejwtAuth, creaEvento);
export default router;
