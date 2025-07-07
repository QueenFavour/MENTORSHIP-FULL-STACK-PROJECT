const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

console.log("process.env.MONGO_URI:", process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing. Check your .env file.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

const Message = mongoose.model('Message', new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true }
}));

app.get("/", (req, res) => {
  res.send("Mentorship Backend is live");
});

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

app.get('/api/test', (req, res) => {
  res.json({ message: 'API working fine' });
});

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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));