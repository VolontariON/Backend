import express from "express";
import swaggerUi from "swagger-ui-express";
import usersRoutes from "./routes/UsersRoutes.js";
import UtilsRoutes from "./routes/UtilsRouter.js";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
import cors from "cors";
import "dotenv/config";

const app = express();
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./swagger.json"), "utf-8")
);

//allow cors
app.use(cors({ credentials: true, origin: true }));
//Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

//routes
app.use("/users", usersRoutes); //volontari e associazioni
app.use("/", UtilsRoutes);

export default app;
