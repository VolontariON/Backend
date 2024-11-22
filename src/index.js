import { getConfig } from "./utils/globals.js";
import mongoose from "mongoose";
import app from "./app.js";
import logger from "./utils/logger.js";

const config = await getConfig();
export var db = null;
const PORT = process.env.PORT || 3001;

// Connect to the database
try {
  mongoose.connect(`mongodb://${config.database_url}/${config.database_name}`);
  logger.info(
    `connected to mongoDB on mongodb://${config.database_url}/${config.database_name}`
  );
} catch (err) {
  logger.fatal(err);
}

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
