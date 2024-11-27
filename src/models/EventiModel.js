import mongoose from "mongoose";
const collection = "Events";

const EventoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hostAssociation: { type: [String], required: false },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  place: { type: String, required: true },
  gmapsLink: { type: String, required: false },
  description: { type: String, required: false },
  subscribedVolonteers: { type: [String], required: false },
});

export default mongoose.model(collection, EventoSchema);
