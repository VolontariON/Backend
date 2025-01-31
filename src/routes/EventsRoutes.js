import express from "express";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
import { getEventi } from "../controllers/EventsController.js";
import { creaEvento } from "../controllers/EventsController.js";
import { getMyEventi } from "../controllers/EventsController.js";
import { deleteEvent } from "../controllers/EventsController.js";
const router = express.Router();

router.get("/getEventi", getEventi);
router.get("/getMyEventi", cookiejwtAuth, getMyEventi);
router.post("/creaEvento", cookiejwtAuth, creaEvento);
router.delete("/deleteEvent", cookiejwtAuth, deleteEvent);
export default router;
