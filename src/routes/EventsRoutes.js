import express from "express";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
import { payloadSize } from "../middleware/payloadSize.js";
import { getEventi } from "../controllers/EventsController.js";
const router = express.Router();

router.get("/getEventi", cookiejwtAuth, getEventi);
export default router;
