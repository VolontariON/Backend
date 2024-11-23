import mongoose from "mongoose";
import Associazione from "./AssociazioneModel.js";
import Evento from "./EventiModel.js";
const collection = "volunteers";

const VolontarioSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, min: 0, max: 200, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  fiscalcode: { type: String, required: true },
  password: { type: String, required: true },
  followedAssociations: { type: [Associazione.Schema], required: false },
  subscribedEvents: { type: [Evento.Schema], required: false },
  description: { type: String, required: false },
  skills: { type: [String], required: false },
  profilePicture: { type: String, required: false },
});

export default mongoose.model(collection, VolontarioSchema);
