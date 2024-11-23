import express from "express";
import { uploadImage, checkLoggedIn } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
const router = express.Router();

router.get("/checkLoggedIn", cookiejwtAuth, checkLoggedIn);
router.post("/uploadImage", uploadImage);

export default router;
