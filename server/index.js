const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Use cors middleware to allow requests from our frontend
app.use(cors());

// Define a simple API endpoint
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello! from the backend server!' });
});

// A simple root endpoint for Render's health check
app.get('/', (req, res) => {
    res.send('Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
