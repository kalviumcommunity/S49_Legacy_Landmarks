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

// app.delete('/placeData/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const initialLength = entities.length;
//   entities = entities.filter(entity => entity.id !== id);
//   if (entities.length === initialLength) {
//     return res.status(404).json({ message: 'Entity not found' });
//   }
//   res.json({ message: 'Entity deleted successfully' });
// });

app.delete('/placeData/:id', (req, res) => {
  const id = req.params.id;
  placeData.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      res.json({ message: 'Entity deleted successfully' });
    })
    .catch(error => {
      console.error('Error deleting data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.put('/updateData/:id', (req, res) => {
  const id = req.params.id;
  const updatedEntity = req.body;
  placeData.findByIdAndUpdate(id, updatedEntity, { new: true })
    .then(data => {
      if (!data) {
        return res.status(404).json({ message: 'Entity not found' });
      }
      res.json({ message: 'Entity updated successfully', data });
    })
    .catch(error => {
      console.error('Error updating data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

app.post('/addData', (req, res) => {
  
  placeData.create(req.body)
    .then(data => {
      console.log('Data added to MongoDB:', data);
      res.json(data); 
    })
    .catch(err => {
      console.error('Error adding data to MongoDB:', err);
      res.status(500).json({ error: 'Internal Server Error' }); 
    });

  const { placeName, location, yearBuilt, architect, architecturalStyle, historicalSignificance, currentUse } = req.body;
  
  console.log('Received data:');

  console.log('Place Name:', placeName);
  console.log('Location:', location);
  console.log('Year Built:', yearBuilt);
  console.log('Architect:', architect);
  console.log('Architectural Style:', architecturalStyle);
  console.log('Historical Significance:', historicalSignificance);
  console.log('Current Use:', currentUse);

  res.status(200).send('Data received successfully!');
});

app.get('/placeData', async (req, res) => {
  let x=await placeData.find();
  res.send(x)
  // console.log(x);
  return x;
});


if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
  });
}

module.exports = app;
