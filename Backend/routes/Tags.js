const router = require('express').Router();
let Tags = require('../models/Tags.model');

router.route('/').get((req, res) => {
  Tags.find()
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  try {
    const TagName = req.body.TagName;
    const newValue = await Tags.create({
      TagName
    });
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

router.route('/:id').delete(async (req, res) => {
  try {
    await Tags.findByIdAndDelete(req.params.id)
    return res.status(200).json('Tag Deleted')
  } catch (error) {
    return res.status(400).json('Error: ' + error)
  }

  // Tags.findByIdAndDelete(req.params.id)
  //   .then(() => res.json('course deleted.'))
  //   .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Tags.findById(req.params.id)
    .then(value => {
      value.TagName = req.body.TagName;
     

      value.save()
        .then(() => res.json('course updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;