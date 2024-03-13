const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    placeName: String,
    location: String,
    yearBuilt: String,
    architect: String,
    architecturalStyle: String,
    historicalSignificance: String,
    currentUse: String
});

const placeData = mongoose.model("placedatas", placeSchema); 
module.exports = placeData;
