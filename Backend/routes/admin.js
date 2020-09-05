const router = require("express").Router();
let Admin = require("../models/admin.model");


router.route('/').get((req, res)=>{
           
            Admin.find()
            .then(value=> res.json(value))
            .catch(err=> res.status(400).json(`Error:` + err));
})

router.post('/add', async (req, res) => {
    try {
      console.log(req.body)
      const newValue = await Admin.create(req.body);
    return res.status(200).json(newValue)
    } catch (error) {
      console.log(error)
      return res.status(400).json('Error: ' + error)
    }
  });

router.route('/update/:id').post((req, res) => {
    
    Admin.findByIdAndUpdate(req.params.id ,req.body )
    .then(() => res.json('Admin updated!'))
      .catch(err =>{ 
        res.status(400).json('Error: ' + err)});
  });  

module.exports = router