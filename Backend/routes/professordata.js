const router = require('express').Router()
const Professordata = require('../models/professordata.model');



router.post('/add', async(req,res)=>{
    const professordata = new Professordata(req.body)
    try {
        const data = await professordata.save()
        res.send(data)
    } catch (error) {
        return res.status(400).json(error)
    }

})


module.exports = router