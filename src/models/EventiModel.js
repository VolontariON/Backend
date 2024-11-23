import mongoose from "mongoose";
import Volontario from "./VolontarioModel";
import Associazione from "./AssociazioneModel";
const collection = "Events";

const EventoSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  hostAssociation: { type: Associazione.Shema, required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  place: { type: String, required: true },
  gmapsLink: { type: String, required: false },
  description: { type: String, required: false },
  subscribedVolonteers: { type: Volontario.Schema, required: false },
});

export default mongoose.model(collection, EventoSchema);
