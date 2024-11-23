import mongoose from "mongoose";
const collection = "imagesTest";

const ImageSchema = new mongoose.Schema({
  // _id: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model(collection, ImageSchema);
