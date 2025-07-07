// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' Database connected successfully'))
  .catch((err) => console.error(' MongoDB connection error:', err));

// Sample Mongoose model
const Message = mongoose.model('Message', new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true }
}));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working fine!' });
});

// Create new message
app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    const saved = await newMessage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

// This is a test change