const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allcoursesschema = new Schema({
  courseId: { type: String, required: true, unique:true },
  courseName: { type: String, required: true },
});

const Allcourses = mongoose.model('Allcourses', allcoursesschema);

module.exports = Allcourses;