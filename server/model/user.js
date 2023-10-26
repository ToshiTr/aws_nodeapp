const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    email:{
        type : String,
        required: true
    },
    usertype:{
        type : String,
        required: true
    }
});


const userdb = mongoose.model('userdb',schema);
module.exports = userdb;
