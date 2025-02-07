import mongoose from "mongoose";
import bcrypt from "bcrypt";
const collection = "Associations";
const SALT_WORK_FACTOR = 10;

const AssociazioneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: true },
  description: { type: String, required: false },
  objectives: { type: String, required: false },
  profilePicture: { type: String, required: false },
  createdEvents: { type: [String], required: false },
  subscribedVolunteers: { type: [String], required: false },
});



AssociazioneSchema.pre("save", function (next) {
  var user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

AssociazioneSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model(collection, AssociazioneSchema);
