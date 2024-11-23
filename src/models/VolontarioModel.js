import mongoose from "mongoose";
import bcrypt from "bcrypt";
const collection = "Volunteers";
const SALT_WORK_FACTOR = 10;

const VolontarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  age: { type: Number, min: 0, max: 200, required: false },
  email: { type: String, required: true, unique: true },
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

//password change middleware
VolontarioSchema.pre("save", function (next) {
  var user = this;
  // cambia hash della password solo se è stato modificato
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
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
