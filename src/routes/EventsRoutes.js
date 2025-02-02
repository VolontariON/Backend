import express from "express";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
import { getEventi } from "../controllers/EventsController.js";
import { creaEvento } from "../controllers/EventsController.js";
import { getMyEventiAssociazione } from "../controllers/EventsController.js";
import { deleteEvent } from "../controllers/EventsController.js";
import { modifyEvent } from "../controllers/EventsController.js";
import { getEvent } from "../controllers/EventsController.js";
import { getMyEventiVolontario } from "../controllers/EventsController.js";
import { subscribeEvent,unsubscribeEvent } from "../controllers/EventsController.js";
const router = express.Router();

router.get("/getEventi", getEventi);
router.get("/getEvent", getEvent);

router.get("/getMyEventiAssociazione", cookiejwtAuth, getMyEventiAssociazione);
router.get("/getMyEventiVolontario", cookiejwtAuth, getMyEventiVolontario);
router.post("/unsubscribeEvent", cookiejwtAuth, unsubscribeEvent);
router.post("/creaEvento", cookiejwtAuth, creaEvento);
router.delete("/deleteEvent", cookiejwtAuth, deleteEvent);
router.post("/modifyEvent", cookiejwtAuth, modifyEvent);
router.post("/subscribeEvent", cookiejwtAuth, subscribeEvent);
export default router;
