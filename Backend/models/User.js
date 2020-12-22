const mongoose = require("mongoose");
const db = require("../accessLayer");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  email: { type: String, required: true, index: true, unique: true },
  password: {
    type: String,
    required: true,
  },
});

const User = db.model("user", userSchema);
module.exports = User;
