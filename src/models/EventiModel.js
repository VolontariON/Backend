import mongoose from "mongoose";
const collection = "Events";

const EventoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hostAssociation: { type: String, required: false },
  startDateTime: { type: String, required: true },
  endDateTime: { type: String, required: true },
  place: { type: String, required: true },
  picture: { type: String, required: false },
  //gmapsLink: { type: String, required: false },
  description: { type: String, required: false },
  subscribedVolonteers: { type: [String], required: false },
  //maxParticipants: { type: Number, required: true },
  /* status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed", "cancelled"],
    required: true,
  }, */
});

export default mongoose.model(collection, EventoSchema);
