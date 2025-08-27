const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // set FRONTEND_URL in env for Netlify domain
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected...'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Define a simple schema and model
const MessageSchema = new mongoose.Schema({
  text: String
});
const Message = mongoose.model('Message', MessageSchema);

// Initial data (to be added once)
async function addInitialMessage() {
  try {
    const existingMessage = await Message.findOne();
    if (!existingMessage) {
      const newMessage = new Message({ text: 'Hello from the MongoDB database!' });
      await newMessage.save();
      console.log('📩 Initial message added to database.');
    }
  } catch (err) {
    console.error('Error adding initial message:', err);
  }
}
addInitialMessage();

// API endpoint to fetch data
app.get('/api/message', async (req, res) => {
  try {
    const message = await Message.findOne();
    if (message) {
      res.json({ message: message.text });
    } else {
      res.json({ message: 'No message found in the database.' });
    }
  } catch (err) {
    console.error('Error fetching message:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Root endpoint (health check for Render)
app.get('/', (req, res) => {
  res.send('✅ Backend is running.');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
