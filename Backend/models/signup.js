const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({

    username: String,
    email: String,
    password: String

});

const signupData = mongoose.model("signup", signupSchema); 
module.exports = signupData;
