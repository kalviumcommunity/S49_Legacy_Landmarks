const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const placeData = require('./models/placeData.js');
const signupData = require('./models/signup.js');
dotenv.config();
const Joi = require('joi')

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



app.post('/auth', async (req, res) => {
  const { error } = signupData.validate(req.body, {abortEarly: false});
  if (error) {
    return res.status(400).json({ error: error.details.map((e) => e.message) });
  }

  const { username, email, password } = req.body;
  const existingUser = await signupData.findOne({ username, email });
  if (existingUser) {
    
    return res.status(400).json({ error: 'User with this first name already exists' });
  }
  const newEntity = new signupData({ username, email, password });
  try {
      const savedEntity = await newEntity.save();
       
      const token = jwt.sign({ userId: savedEntity._id }, JWT_SECRET, { expiresIn: '1h' });
      
      return res.json({ token, savedEntity });
    } catch (error) {
      console.error("Error adding entity:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
});


const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.userId = decoded.userId;
    next();
  });
};


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


const updateEntitySchema = Joi.object({
  placeName: Joi.string().required(),
  location: Joi.string().required(),
  yearBuilt: Joi.string().required(),
  architect: Joi.string().required(),
  architecturalStyle: Joi.string().required(),
  historicalSignificance: Joi.string().required(),
  currentUse: Joi.string().required()
});

app.put('/updateData/:id', (req, res) => {

  const validateUpdateEntity = (req, res, next) => {
    const { error } = updateEntitySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };

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




const addEntitySchema = Joi.object({
  placeName: Joi.string().required(),
  location: Joi.string().required(),
  yearBuilt: Joi.string().required(),
  architect: Joi.string().required(),
  architecturalStyle: Joi.string().required(),
  historicalSignificance: Joi.string().required(),
  currentUse: Joi.string().required()
});

app.post('/addData', (req, res) => {

  const validateAddEntity = (req, res, next) => {
    const { error } = addEntitySchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
  
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

app.get('/signup', async(req, res)=>{
  try{
    const userSignin = await signupData.find()
    res.send(userSignin)
  }catch(error){
    console.log(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})


app.post('/signup', async (req, res) => {
console.log("calling...")
  const { error } = signupData.validate(req.body, {abortEarly: false});
  if (error) {
    return res.status(400).json({ error: error.details.map((e) => e.message) });
  }

  const { username, email, password } = req.body;
  console.log( username, email, password)
  const existingUser = await signupData.findOne({ username, email });
  if (existingUser) {
    return res.status(400).send({ message: 'User with this username or email already exists' });
  }
  const newEntity = new signupData({ username, email, password });


  try {
    const savedEntity = await newEntity.save();
    console.log(savedEntity,"saved")
       
    const token = jwt.sign({ userId: savedEntity._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log(token)
      
    return res.send({data:savedEntity,token:token}); 
  } catch (error) {
    console.error("Error adding entity:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
    console.log('MongoDB URI:', process.env.MONGODB_URI);
  });
}

module.exports = app;
