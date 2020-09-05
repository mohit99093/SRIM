const router = require('express').Router()
const Student = require('../models/Student.model');
const Professor = require("../models/Professor.model.js")
const Studentdata = require("../models/studentdata.model")
const Professordata = require("../models/professordata.model")

// Validation 
const joi = require("joi")
const bcrypt = require("bcryptjs");
const Admin = require('../models/admin.model');

require('dotenv').config();

// schema for joi
const signinschema = joi.object({
        emailId:joi.string().required().email(),
        password:joi.string().min(6).required()
})

const signupschema = joi.object({
    emailId:joi.string().required().email(),
    password:joi.string().min(6).required(),
    confirmpassword:joi.ref('password')
})


// STUDENT SIGN IN
router.post('/student/signin' , async(req,res)=>{
        let newvalues = []
               
            const { error }  =   signinschema.validate(req.body)
            if(error)
            return res.status(200).send({message:error.details[0].message, found:false})

            newvalues = await Student.findOne({emailId:req.body.emailId})
            if(!newvalues)
            return res.status(200).send({message:"Not Found" , found:false})

            const validPass = await bcrypt.compare(req.body.password,newvalues.password)
            if(!validPass) 
            return res.status(200).send({message:"Password Incorrect", found:false})

            return  res.status(200).send({message:"Found", found:true})
       
});


// STUDENT SIGN UP
router.post('/student/signup' , async(req,res)=>{
    let newvalues = []
           
        // validate
        const { error }  =   signupschema.validate({emailId:req.body.emailId,password:req.body.password,confirmpassword:req.body.confirmpassword})
        if(error)
        return res.status(200).send({message:error.details[0].message,found:false})

        // check if it alerady sign in
        newvalues = await Student.findOne({emailId:req.body.emailId})
        if(newvalues)
        return res.status(200).send({message:"already sign Up used sign In", found:false})

        // get student data
        let studentId = req.body.emailId.substring(0,9)
        let studentdata = await Studentdata.findOne({studentId:studentId})
        if(!studentdata)
        return res.status(200).send({message:"Invalid Entry", found:false})

        console.log(studentdata)
        // create new student
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt) 
        const newStudent = {
            ...req.body,
            password:hashedPassword,
           ...studentdata._doc,
           profile:{
            toolsAndTechnology:[],
            intrest:[],
            other:""
          },
          appliedTopics:[],
          finalgrade:-1,
          finalApprove:{},
          TeamNumber:-1,
         
          Teamtimeline:[]

        }
        console.log(newStudent)
        const data = new Student(newStudent)
        console.log("2")
        console.log(data)
        try{
            const savedStudent = await data.save();
            res.status(200).send({message:"sign up successful", found:true})
        }
        catch(err){
                res.status(200).send(err)
        }
 
       
   
});

// PROFESSOR SIGN IN
router.post('/professor/signin' , async(req,res)=>{
    let newvalues = []
           
        const { error }  =   signinschema.validate(req.body)
        console.log(error);
        if(error)
        return res.status(200).send({message:error.details[0].message, found:false})

        newvalues = await Professor.findOne({emailId:req.body.emailId})
        console.log(newvalues);
        if(!newvalues)
        return res.status(200).send({message:"Not Found" , found:false})

        const validPass = await bcrypt.compare(req.body.password,newvalues.password)
            if(!validPass) 
            return res.status(200).send({message:"Password Incorrect", found:false})

        return  res.status(200).send({message:"Found", found:true})         
   
});


// PROFESSOR SIGN UP
router.post('/professor/signup' , async(req,res)=>{
let newvalues = []
       
    // validate
    const { error }  =   signupschema.validate({emailId:req.body.emailId,password:req.body.password,confirmpassword:req.body.confirmpassword})
    if(error)
    return res.status(200).send({message:error.details[0].message, found:false})

    // check if it alerady sign in
    newvalues = await Professor.findOne({emailId:req.body.emailId})
    if(newvalues)
    return res.status(200).send({message:"already sign Up used sign In", found:false})

      // get professor data
    let emailId = req.body.emailId
    let professordata = await Professordata.findOne({emailId:emailId})
    if(!professordata)
    return res.status(200).send({message:"Invalid Entry", found:false})

    console.log(professordata)
    // create new Professor
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt) 
    const newStudent = {
        ...req.body,
        ...professordata._doc,
        password:hashedPassword,
        professorCourses:[],
        topics:[]
    }
    console.log(newStudent)
    const data = new Professor(newStudent)
    console.log("2")
    console.log(data)
    try{
        const savedStudent = await data.save();
        res.status(200).send({message:"sign up successful", found:true})
    }
    catch(err){
            res.status(200).send(err)
    }

   

});

// ADMIN SIGN IN
router.post('/admin/signin' , async(req,res)=>{
    let newvalues = []
           
        const { error }  =   signinschema.validate(req.body)
        console.log(error);
        if(error)
        return res.status(200).send({message:error.details[0].message, found:false})

        newvalues = await Admin.findOne({emailId:req.body.emailId})
        if(!newvalues)
        return res.status(200).send({message:"Not Found" , found:false})

        const validPass = await bcrypt.compare(req.body.password,newvalues.password)
        if(!validPass) 
        return res.status(200).send({message:"Password Incorrect", found:false})
        
        return  res.status(200).send({message:"Found", found:true})
   
});


// ADMIN SIGN UP
router.post('/admin/signup' , async(req,res)=>{

       
    // validate
    const { error }  = await  signupschema.validate({emailId:req.body.emailId,password:req.body.password,confirmpassword:req.body.confirmpassword})
    if(error)
    return res.status(200).send({message:error.details[0].message, found:false})

    
    // create new Professor
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt) 
    
    let oldvalue = await Admin.findOne()
    console.log(oldvalue)
    let newvalue = {
            ...oldvalue._doc,
            emailId:req.body.emailId,
            password:hashedPassword
    }
    console.log(newvalue)
  
  await  Admin.findOneAndUpdate({_id:newvalue._id}, newvalue).then(()=>res.status(200).send({message:"success full updated", found:true}))
    .catch((err)=>{
        console.log(err)
      return  res.status(200).send({message:err, found:false})})  
});





module.exports = router