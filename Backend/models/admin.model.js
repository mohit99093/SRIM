const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
        timeline:[{
                stageName:String,
                fileinput:Boolean,
                selectedDate:Date,
                discription:String
        }],
        emailId:String,
        password:String
})

const Admin = mongoose.model("admin",AdminSchema)

module.exports = Admin