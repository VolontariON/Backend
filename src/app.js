import express from "express";
import pinoHttp from "pino-http";
const pino = pinoHttp();
import swaggerUi from "swagger-ui-express";
import usersRoutes from "./routes/UsersRoutes.js";
import fs from "fs";
import path from "path";
const app = express();
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./swagger.json"), "utf-8")
);

// setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded());
app.use(pino);

//routes
app.use("/", usersRoutes);
export default app;
