const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors());

// Define Routes
app.use('/api', require('./routes/auth'));
app.use('/api/components', require('./routes/components'));

// Basic route to test the server
app.get('/', (req, res) => {
  res.send('API Running');
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  // Left one important console log for server start confirmation
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Server started on port ${PORT}`);
  }
}); 