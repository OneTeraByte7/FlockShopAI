// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // store plain text for mock (never do this in prod)
});

module.exports = mongoose.model("User", userSchema);
