import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";
import "dotenv/config";
const PORT = process.env.PORT || 3001;
var server = null;
const mongoConnect = async () => {
  let intervalId;
  intervalId = setInterval(() => {
    logger.warn("Attempting to connect to MongoDB...");
  }, 1000);
  await mongoose.connect(
    `mongodb://${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
  );

  clearInterval(intervalId);
  logger.info(
    `connected to mongoDB on mongodb://${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
  );
};

const startServer = () => {
  server = app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`); //TODO: SSL cretification
  });
};
try {
  await mongoConnect();
  startServer();
  mongoose.connection.on("disconnected", async () => {
    logger.error("MongoDB connection lost!");
    await mongoConnect();
  });

  mongoose.connection.on("error", (err) => {
    logger.error("MongoDB connection error:", err);
  });
} catch (err) {
  logger.fatal(err);
}
