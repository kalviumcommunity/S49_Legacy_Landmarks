const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    
    placeName: String,
    location: String,
    yearBuilt: String,
    architect: String,
    architecturalStyle: String,
    historicalSignificance: String,
    currentUse: String,
    userlocal: String
});

const placeData = mongoose.model("placedatas", placeSchema); 
module.exports = placeData;
