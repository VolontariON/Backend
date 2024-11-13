import { getConfig } from "./utils/globals.js";
import mongoose from "mongoose";
import app from "./app.js";
import pino from "pino";

const config = await getConfig();
export var db = null;
const PORT = process.env.PORT || 3001;

// Connect to the database
mongoose.connect(`mongodb://${config.database_url}/${config.database_name}`);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
