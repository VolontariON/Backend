import express from "express";
import { checkLoggedIn, sendEmail } from "../controllers/UtilsController.js";
import { cookiejwtAuth } from "../middleware/cookiejwtAuth.js";
const router = express.Router();

router.get("/checkLoggedIn", cookiejwtAuth, checkLoggedIn);
router.get("/sendEmail", sendEmail);

export default router;
