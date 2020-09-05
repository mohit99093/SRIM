const mongoose = require('mongoose');
const { string } = require('joi');

const Schema = mongoose.Schema;

const professordataSchema = new Schema({

        professorName:String,
        emailId:String,
})

const Professordata = mongoose.model('Professordata', professordataSchema);
module.exports = Professordata;