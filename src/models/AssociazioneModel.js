import mongoose from "mongoose";
const collection = "Associations";

const AssociazioneSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  fiscalcode: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String, required: false },
});

export default mongoose.model(collection, AssociazioneSchema);
