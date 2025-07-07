const cors = require("cors"); app.use(cors());
require('dotenv').config(); // Load env vars

console.log("process.env.MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing! Check your .env file.");
  process.exit(1); // Stop the app
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

app.get('/api/profile', (req, res) => {
  const userProfile = {
    name: 'Favour Folade',
    email: 'favourfolade@gmail.com',
    role: 'Executive Assistant',
    location: 'Lagos, Nigeria',
    skills: ['Scheduling', 'Research', 'Social Media', 'Notion', 'Google Workspace']
  };

  res.json(userProfile);
});

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
app.get("/", (req, res) => {
  res.send("Mentorship Backend is live");
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
