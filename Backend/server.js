const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const placeData = require('./models/placeData.js');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; 

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
  });

  app.use(cors());
  app.use(express.json());


app.get('/placeData', async (req, res) => {
  let x=await placeData.find();
  console.log(x);
  res.json(x);
});


if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
  });
}

module.exports = app;
