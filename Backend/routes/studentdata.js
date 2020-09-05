const router = require('express').Router()
const Studentdata = require('../models/studentdata.model');



router.post('/add', async(req,res)=>{
    const studentdata = new Studentdata(req.body)
    try {
        const data = await studentdata.save()
        res.send(data)
    } catch (error) {
        return res.status(400).json(error)
    }

})


module.exports = router