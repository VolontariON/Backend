import mongoose from "mongoose";
const collection = "Events";

const EventoSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  hostAssociation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Associations",
    required: true,
  },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  place: { type: String, required: true },
  gmapsLink: { type: String, required: false },
  description: { type: String, required: false },
  subscribedVolonteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Volunteers",
      required: false,
    },
  ],
});

export default mongoose.model(collection, EventoSchema);
