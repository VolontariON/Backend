import express from "express";
import swaggerUi from "swagger-ui-express";
import usersRoutes from "./routes/UsersRoutes.js";
import generalRoutes from "./routes/generalRoutes.js";
import cookieParser from "cookie-parser";
import fs from "fs";
import path from "path";
const app = express();
const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("./swagger.json"), "utf-8")
);

// setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));

//routes
app.use("/users", usersRoutes); //volontari e associazioni
app.use("/", generalRoutes);

export default app;
