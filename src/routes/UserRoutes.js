import express from "express";
import { getUsers, createUser } from "../controllers/UserControler.js";

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/createUser", createUser);

export default router;
