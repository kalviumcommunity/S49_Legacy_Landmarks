const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check MongoDB connection status
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define the ping route with the response in JSON
app.get('/ping', (req, res) => {
  res.json({ "message": "pong" });
});

// Define the home route to respond with database connection status
app.get('/', (req, res) => {
  const dbStatus = db.readyState === 1 ? "Connected" : "Disconnected";
  res.json({ "database_status": dbStatus });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;
