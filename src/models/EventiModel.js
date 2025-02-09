import mongoose from "mongoose";
const collection = "Events";

const EventoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hostAssociation: { type: String, required: false },
  hostAssociationName: { type: String, required: false },
  startDateTime: { type: String, required: true },
  endDateTime: { type: String, required: true },
  place: { type: String, required: true },
  picture: { type: String, required: false },
  description: { type: String, required: false },
  subscribedVolonteers: { type: [String], required: false },
});

export default mongoose.model(collection, EventoSchema);
