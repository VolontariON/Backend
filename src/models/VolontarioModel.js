import mongoose from "mongoose";
import bcrypt from "bcrypt";
const collection = "Volunteers";
const SALT_WORK_FACTOR = 10;

const VolontarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, min: 0, max: 200, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  password: { type: String, required: true},
  followedAssociations: { type: [String], required: false },
  subscribedEvents: { type: [String], required: false },
  description: { type: String, required: false },
  skills: { type: [String], required: false },
  profilePicture: { type: String, required: false },
});

VolontarioSchema.pre("save", function (next) {
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

VolontarioSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

export default mongoose.model(collection, VolontarioSchema);
