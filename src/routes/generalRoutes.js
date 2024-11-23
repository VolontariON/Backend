import express from "express";
import { uploadImage } from "../controllers/generalController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
const router = express.Router();

router.post("/uploadImage", uploadImage);

export default router;
