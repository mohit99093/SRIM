const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const alltopicsschema = new Schema({
      topicName:{type:String},
      Tags:[{type:String}],
      Prerequisite:[{type:String}],
      Discription:{type:String},
      Students:[{type:Schema.ObjectId}],
      finalStudents:[{
        studentobjId:{type:Schema.ObjectId},
        studentId:{type:String},
        teamUp:{type:Boolean},
        teamIndex:{type:Number}
      }],
      Teams:[{
        teamMember:[{type:String}],
        timeline:[{
          stageName:{type:String},
          fileinput:{type:Boolean},
        selectedDate:{type:Date},
        discription:{type:String},
        iscompleted:Boolean,
        grads:[{
          studentId:{type:String},
          g:{type:Number}
        }]

        }],
      }],
      profobjId:{type:Schema.ObjectId}
});

const alltopics = mongoose.model('alltopics', alltopicsschema);

module.exports = alltopics;