const router = require('express').Router();
let Student = require('../models/Student.model');



router.route('/').get((req, res) => {
  Student.find().sort({studentId:1})
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:id').get((req, res) => {
  Student.findById(req.params.id)
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/getbystudentId/:id').get((req, res) => {
  Student.find({studentId:req.params.id})
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/getbyemailId/:id').get((req, res) => {
  console.log(req.params.id)
  Student.find({emailId:req.params.id})
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  try {
    console.log(req.body)
    const newValue = await Student.create(req.body);
  return res.status(200).json(newValue)
  } catch (error) {
    console.log(error)
    return res.status(400).json('Error: ' + error)
  }
});

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:id').delete(async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id)
    return res.status(200).json('Tag Deleted')
  } catch (error) {
    return res.status(400).json('Error: ' + error)
  }

  // Student.findByIdAndDelete(req.params.id)
  //   .then(() => res.json('course deleted.'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    
  Student.findByIdAndUpdate(req.params.id ,req.body )
  .then(() => res.json('student updated!'))
    .catch(err =>{ 
      res.status(400).json('Error: ' + err)});
});

router.route('/updatebystudentId/:id').post((req, res) => {
  
  Student.findOneAndUpdate({studentId:req.params.id},req.body, {new:true} )
  .then((value) =>{
     return res.json('student updated!')
  } )
    .catch(err =>{ 
      res.status(400).json('Error: ' + err)});
});


// router.route('/removeteamfields/:id').post((req,res)=>{
//       console.log(req.params.id)
//       Student.update({studentId:req.params.id},(err,student)=>{
//            delete student.TeamNumber
//            delete student.TeamobjId
//            student.save()

//       }).then(()=>res.json('student updated!'))
//       .catch((err)=>  res.status(400).json('Error: ' + err))
      
     
// })

module.exports = router;