const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: { type: String, unique: true },
  gender: String,
  password: String,
  eventDate: String,
  pdfPath: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
