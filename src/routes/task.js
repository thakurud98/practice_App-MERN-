const express = require('express')
const router = new express.Router()
const Task = require('../model/task')
const auth = require("../middleware/auth")


/**Create task
 * @param Object {
 * }
 */
router.post("/v1/api/create_task", auth, async (req, res)=>{
    try{
        let task = await Task({
            ...req.body,
            owner: req.user._id
        })
        await task.save();
        return res.status(200).send({"msg":"Task created", "data": task,"error" : false})
    }catch(e){
        return res.status(200).json({"msg":e, "data": e.errors.description.message,"error" : true})
    }
})

/**Get task by id */
router.get("/v1/api/task_by_id/:id", auth, async (req, res)=>{
    try{
        let _id = req.params.id
        //using multiple queries
        let task = await Task.findOne({_id, owner: req.user._id})
        if(!task) return res.status(404).send()
        return res.status(200).send({"msg":"Task Found", "data": task,"error" : false})
    }catch(e){
        return res.status(200).send({"msg": e.toString(), "data": null, "error": true})
    }
})

/**Get all tasks 
 * task/completed=true
 * task/limit=2&skip=10
 * task/sort=created_at:-1 / updated_at:-1
 * asc = 1, desc =-1
*/
router.get("/v1/api/task", auth, async (req, res)=>{
    try{
        let match = {}
        let options = {}
        if(req.query.completed) match.completed = req.query.completed == 'true' ? true :  false
        if(req.query.limit) options.limit = parseInt(req.query.limit)
        if(req.query.skip) options.skip = parseInt(req.query.skip)
        if(req.query.sort) {
            let sortQuery = req.query.sort.split(":")
            options.sort = { [sortQuery[0]] : parseInt(sortQuery[1])}
        }
        //using populate
        await req.user.populate({ path: 'tasks', match, options}).execPopulate()
        return res.status(200).send({"msg":"Task Found", "data": req.user.tasks,"error" : false})
        //using find()
        // let task = await Task.find({owner: req.user._id})
        // if(!task) return res.status(404).send()
        // return res.status(200).send({"msg":"Task Found", "data": task,"error" : false})
    }catch(e){
        return res.status(200).send({"msg": e.toString(), "data": null, "error": true})
    }
})

/**Updating a task */
router.patch("/v1/api/update_task_by_id/:id", auth, async (req, res)=>{
    try{
        let data = req.body
        let updates = Object.keys(data)
        let allowedUpdates = ['completed', 'description']
        const isValidRequest = updates.every((update)=> allowedUpdates.includes(update))
        if (!isValidRequest) return res.status(400).send({ msg: "Invalid updates", data: null, error: true });
        let task = await Task.findOne({_id : req.params.id, owner: req.user._id})
        if(!task) return res.status(404).send()
        updates.forEach((update)=> task[update] = data[update])
        await task.save()
        return res.status(200).send({"msg": "Task has been updated", "data": task, "error": false})
    }catch(e){
        return res.status(200).send({"msg": e.toString(), "data": null, "error": true})
    }
})

/**Delete a task by id */
router.patch("/v1/api/delete_task_by_id/:id", auth, async (req, res)=>{
    try{
        let task = await Task.findOneAndDelete({_id : req.params.id, owner: req.user._id})
        if(!task) return res.status(404).send()
        return res.status(200).send({"msg": "Task has been deleted", "data": null, "error": false})
    }catch(e){
        return res.status(200).send({"msg": e.toString(), "data": null, "error": true})
    }
})

module.exports = router