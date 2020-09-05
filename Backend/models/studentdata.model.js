const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentdataSchema = new Schema({

        studentName:String,
        studentId:String,
        results:[{
            cpi:Number,
            subject:[{   courseId:String,  courseName:String,  grade:Number    }],
          }]


})

const Studentdata = mongoose.model('Studentdata', studentdataSchema);
module.exports = Studentdata;