const router = require('express').Router();
let alltopics = require('../models/alltopics.model');


router.route('/').get((req, res) => {
  alltopics.find()
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/get/:id').get((req, res) => {
  alltopics.findById(req.params.id)
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const newValue = new alltopics(req.body);
  newValue.save()
  .then(() => res.json(newValue))
  .catch(err => res.status(400).json('Error: ' + err));

});

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/delete/:id').delete((req, res) => {

  alltopics.findByIdAndDelete(req.params.id)
    .then(() => res.json('course deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/deletebyname/:name').delete((req, res) => {

  alltopics.findOneAndDelete({topicName:req.params.name})
    .then(() => res.json('topic deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post( async(req, res) => {

  try {
    
   const newValue =await alltopics.findByIdAndUpdate(req.params.id, req.body, {new: true})
   console.log(newValue);

    return res.status(200).json(newValue)  
  } catch (err) {
        return res.status(400).json('Error: ' + err)
  }
 
  // alltopics.findByIdAndUpdate(req.params.id, req.body, { new:true })
//   .then((value) =>{
//     console.log(value)
//    return  value
//   })
//     .catch(err =>{ console.log(err)
//     return    res.status(400).json('Error: ' + err)});
// });
// try {
//   // console.log(req.body)
//   const newValue = await Professor.create(req.body);
//   // Professor.create(req.body)
// return res.status(200).json(newValue)
// } catch (error) {
//   return res.status(400).json('Error: ' + error)
})

router.route('/pushStudent/:id').post((req, res) => {
  console.log(req.body)
  alltopics.updateOne( { _id: req.params.id},
    { $push:{
      Students :req.body.studentobjId
    }
  })
  .then(() => res.status(200).json('topics updated!'))
    .catch(err =>{ console.log(err)
    return    res.status(400).json('Error: ' + err)});
});

router.route('/pushfinalStudent/:id').post((req, res) => {
  console.log(req.body)
  alltopics.updateOne( { _id: req.params.id},
    { $push:{
      finalStudents :req.body
    }
  })
  .then(() => res.status(200).json('topics updated!'))
    .catch(err =>{ console.log(err)
    return    res.status(400).json('Error: ' + err)});
});

router.route('/pullfinalStudent/:id').post((req, res) => {
  console.log(req.body)
  alltopics.updateOne( { _id: req.params.id},
    { $pull:{
      finalStudents :req.body
    }
  })
  .then(() => res.status(200).json('topics updated!'))
    .catch(err =>{ console.log(err)
    return    res.status(400).json('Error: ' + err)});
});




module.exports = router;