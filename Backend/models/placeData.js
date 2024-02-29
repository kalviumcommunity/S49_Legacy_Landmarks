const mongoose = require('mongoose');

const placeSchema  = new mongoose.Schema({
    id: Number,
    placeName: String,
    location: String,
    yearBuilt: String,
    architect: String,
    architecturalStyle: String,
    historicalSignificance: String,
    currentUse: String
})

const dataModel  = mongoose.model("legacyLandmarks", placeSchema); 
module.exports = dataModel;