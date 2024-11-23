import Image from "../models/imageModel.js";
import logger from "../utils/logger.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    const imgObj = new Image(req.body);
    await imgObj.save();
    res.status(201).json({ response: "OK" });
    logger.info("image loaded: " + res.statusCode);
  } catch (err) {
    res.status(500).json({ error: "server error" });
    logger.error(err);
  }
};
