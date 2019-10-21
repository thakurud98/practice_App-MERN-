const express = require('express')
const router = new express.Router()
const Task = require('../model/task')
const auth = require("../middleware/auth")


router.post("/v1/api/create_task", auth, async (req, res)=>{
    try{
        let task = Task({
            ...req.body,
            owner: req.user._id
        })
        task.save(); 
        return res.status(200).send({"msg":"Task created", "data": task,"error" : false})
    }catch(e){
        return res.status(500).json({"msg":"SERVER-ERROR", "data": e.toString(),"error" : true})
    }
})

module.exports = router