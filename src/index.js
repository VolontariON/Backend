import { getConfig } from "./globals.js";

import mongoose from "mongoose";
import express from "express";

const config = await getConfig();
export const app = express();
export var db = null;

const PORT = process.env.PORT || 3001;

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("test1", userSchema);
// Basic route
app.get("/getUsers", (req, res) => {
  User.find({})
    .then(function (user) {
      res.json(user);
    })
    .catch(function (err) {
      console.log(err);
    });
});

mongoose.connect(`mongodb://${config.database_url}/${config.database_name}`);

// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
