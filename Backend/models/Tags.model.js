const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Tagsschema = new Schema({
  TagName: { type: String, required: true, unique:true },
  
});

const Tags = mongoose.model('Tags', Tagsschema);

module.exports = Tags;