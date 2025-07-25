const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  content: String
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);