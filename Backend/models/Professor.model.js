const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Professorschema = new Schema({

    professorName:{ type:String, },
    emailId:{type:String },
    professorCourses:[ {type:String} ],
    topics: [{type:Schema.ObjectId} ],
    password:String
});

const Professor = mongoose.model('professor', Professorschema);

module.exports = Professor;