const router = require('express').Router();
let Allcourses = require('../models/allcourses.model');

router.route('/').get((req, res) => {
  Allcourses.find()
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const courseId = req.body.courseId;
  const courseName = req.body.courseName;
  
 
  const newValue = new Allcourses({
    courseId,
    courseName,
  });
 
  newValue.save()
  .then(() => res.json('Add added!'))
  .catch(err => {
      console.log(err)
    res.status(400).json('Error: ' + err)});
  // .catch(err => req);
});

// router.route('/:id').get((req, res) => {
//   Exercise.findById(req.params.id)
//     .then(exercise => res.json(exercise))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:id').delete((req, res) => {

  Allcourses.findByIdAndDelete(req.params.id)
    .then(() => res.json('course deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Allcourses.findById(req.params.id)
    .then(value => {
      value.courseId = req.body.courseId;
      value.courseName = req.body.courseName;
     

      value.save()
        .then(() => res.json('course updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;