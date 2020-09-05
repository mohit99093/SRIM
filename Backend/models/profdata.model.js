const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profdataSchema = new Schema({

    profName:String,
    emailId:String,

})


const Profdata = mongoose.model('Profdata', profdataSchema);
module.exports = Profdata;