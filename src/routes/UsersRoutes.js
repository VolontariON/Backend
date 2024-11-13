import express from "express";
import { getVolontari } from "../controllers/VolontarioController.js";
const router = express.Router();

router.get("/getVolontari", getVolontari);
// router.post("/createUser", createUser);

export default router;
