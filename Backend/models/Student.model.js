const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
 
  studentName:String,
  studentId:String,
  emailId:String,
  password:String,
  profile:{
    toolsAndTechnology:[{type:String}],
    intrest:[{type:String}],
    other:String
  },
  finalgrade:Number,
  results:[{
    cpi:Number,
    subject:[{   courseId:String,  courseName:String,  grade:Number    }],
  }],
  finalApprove:{
    profobjId:Schema.ObjectId,
    topicobjId:Schema.ObjectId
  },
  TeamobjId:Schema.ObjectId,
  TeamNumber:Number,
  appliedTopics: [ { profEmailId:String,
  profName: String,
  profobjId:Schema.ObjectId,
   topics:[
  { topicName:String,
    topicobjId:Schema.ObjectId,
    stage1:Boolean,
    stage2:Boolean,
    stage3:Boolean,
    stage4:Boolean
  }
]} ]

  
});
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;