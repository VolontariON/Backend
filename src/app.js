import express from "express";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/UserRoutes.js";
import { getConfig } from "./utils/globals.js";
import fs from "fs";
import path from "path";

const config = await getConfig();
const app = express();
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./swagger.json"), "utf-8")
);

// setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(express.urlencoded());

//routes
app.use("/users", userRoutes);
export default app;
