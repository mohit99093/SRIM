const router = require('express').Router();
let Chat = require('../models/Chat.model');

router.route('/').get((req, res) => {
  Chat.find()
    .then(value => res.json(value))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/add', async (req, res) => {
  try {
  
    const newValue = await Chat.create(req.body);
    console.log(newValue)
    console.log(req.body);
  return res.status(200).json(newValue)
  } catch (error) {
    return res.status(400).json('Error: ' + error)
  }
});


module.exports = router;