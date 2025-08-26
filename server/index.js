const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// Define a simple schema and model
const MessageSchema = new mongoose.Schema({
  text: String
});
const Message = mongoose.model('Message', MessageSchema);

// Initial data (to be added once)
// async function addInitialMessage() {
//   const existingMessage = await Message.findOne();
//   if (!existingMessage) {
//     const newMessage = new Message({ text: 'Hello from the MongoDB database!' });
//     await newMessage.save();
//     console.log('Initial message added to database.');
//   }
// }
// addInitialMessage();

// Define the API endpoint to fetch data from the database
app.get('/api/message', async (req, res) => {
  try {
    const message = await Message.findOne();
    if (message) {
      res.json({ message: message.text });
    } else {
      res.json({ message: 'No message found in the database.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// A simple root endpoint for Render's health check
app.get('/', (req, res) => {
    res.send('Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});