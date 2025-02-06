import express from "express";
import swaggerUi from "swagger-ui-express";
import usersRoutes from "./routes/UsersRoutes.js";
import associazioniRoutes from "./routes/AssociazioniRoutes.js";
import UtilsRoutes from "./routes/UtilsRouter.js";
import eventsRoutes from "./routes/EventsRoutes.js";
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
app.use(
  cors({
    origin: [
      "https://volontarionfrontend.onrender.com",
      "http://localhost:5173",
    ], // Allow frontend.com
    credentials: true, // Allow cookies/auth headers
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
app.use(express.urlencoded({ extended: true }));

// setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cookieParser());
app.use(express.json({ limit: "16mb" }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));

//routes
app.use("/users", usersRoutes); //volontari
app.use("/events", eventsRoutes); //eventi
app.use("/associazioni", associazioniRoutes);
app.use("/", UtilsRoutes);

export default app;
