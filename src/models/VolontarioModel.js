import mongoose from "mongoose";
const collection = "volunteers";

/* const VolontarioSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  fiscalcode: { type: String, required: true },
  password: { type: String, required: true },
  followedAssociations: { type: [String], required: false },
  description: { type: String, required: false },
  skills: { type: [String], required: false },
  profilePicture: { type: String, required: false },
});

export default mongoose.model(collection, VolontarioSchema); */

const VolontarioSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false },
});

export default mongoose.model(collection, VolontarioSchema);
