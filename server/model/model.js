const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    rollno : {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    name:{
        type : String,
        required: true
    },
    dob:{
        type : String,
        required: true
    },
    score:{
        type : Number,
        required: true
    }
});


const resultdb = mongoose.model('resultdb',schema);
module.exports = resultdb;
