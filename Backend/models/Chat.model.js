const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Chatschema = new Schema({

    to:{ type:Schema.ObjectId },
    message:{type:String} ,
    Date: {type:Date},
    from:{type:Schema.ObjectId}
   
});

const Chat = mongoose.model('Chat', Chatschema);

module.exports = Chat;