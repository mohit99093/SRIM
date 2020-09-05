const router = require('express').Router();
let Professor = require('../models/Professor.model');
const mongoose = require('mongoose');
router.route('/').get((req, res) => {
  Professor.find()
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:emailId').get((req, res) => {
  Professor.find({emailId:req.params.emailId })
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  try {
    // console.log(req.body)
    const newValue = await Professor.create(req.body);
    // Professor.create(req.body)
  return res.status(200).json(newValue)
  } catch (error) {
    return res.status(400).json('Error: ' + error)
  }
});

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/delete/:id').delete(async (req, res) => {
  try {
    await Professor.findByIdAndDelete(req.params.id)
    return res.status(200).json('Tag Deleted')
  } catch (error) {
    return res.status(400).json('Error: ' + error)
  }

  // Professor.findByIdAndDelete(req.params.id)
  //   .then(() => res.json('course deleted.'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    console.log("from update");
    console.log(req)
    let topics = req.body.topics;
    let newtopics = topics.map(e=> mongoose.Types.ObjectId(e))
    let newvalue = {
        ...req.body,
        topics:newtopics
    }
    console.log(newvalue);
    Professor.findByIdAndUpdate(req.params.id, newvalue)
    .then(() => res.status(200).json('Professor updated!'))
      .catch(err =>{ console.log(err)
      return    res.status(400).json('Error: ' + err)});
});


module.exports = router;