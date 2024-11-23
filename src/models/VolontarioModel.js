import mongoose from "mongoose";

const collection = "Volunteers";

const VolontarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, min: 0, max: 200, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  fiscalcode: { type: String, required: true },
  password: { type: String, required: true },

  followedAssociations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Associations",
      required: false,
    },
  ],
  subscribedEvents: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Events", required: false },
  ],
  description: { type: String, required: false },
  skills: { type: [String], required: false },
  profilePicture: { type: String, required: false },
});

export default mongoose.model(collection, VolontarioSchema);
