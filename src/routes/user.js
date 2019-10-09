const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')

/********Creating User*********/
/**API for creating a user 
 * @param Object
 * @return Object
*/
router.post("/v1/api/create_users", async (req, res)=>{
    try{
        let user = User(req.body)
        await user.save();
        return res.status(200).json({"msg":"User created", "data": user,"error" : false})
    }catch(e){
        return res.status(500).json({"msg":"SERVER-ERROR", "data": e,"error" : true})
    }    
})

/**API for getting All user's data
 * @return Object
 */
router.get("/v1/api/get_users", auth, async (req, res)=>{
    try{
        let user = await User.find({})
        if(!user) return res.status(404).send({ msg: "No records found", data: null, error: true });
        return res.status(200).send({ msg: null, data: user, error: false });
    }catch(e){
        return res.status(500).send({ msg: e, data: null, error: true });
    }
})

/**API fro getting user Data by Id
 * @param id
 * @returns Object
 */
router.get("/v1/api/user_by_id/:id", async (req, res)=>{
    //using select to not send _v in respons
    try{
        let _id = req.params.id
        let user = await  User.findById(_id).select("-__v")
        if(!user) return res.status(404).send({ msg: "No record found for this user", data: null, error: true });
        return res.status(200).send({ msg: null, data: user, error: false });
    }catch(e){
        return res.status(500).send({ msg: e, data: null, error: true });
    }
})

router.delete("/v1/api/delete_by_id/:id", async (req, res)=>{
    try{
        let _id = req.params.id
        let user = await  User.findByIdAndDelete(_id).select("-password")
        if(!user) return res.status(404).send({ msg: "User not found", data: null, error: true })
        return res.status(200).send({ msg: null, data: "User deleted", error: false });
    }catch(e){
        return res.status(500).send({ msg: e, data: null, error: true });
    }
    
})

/**API fro updating a user's document 
 * @param Object
 * @returns Object
*/
router.patch("/v1/api/update_by_id/:id", async (req, res)=>{
    try{
        let {data} = req.body
        let id = req.params.id
        if(id == undefined || id === undefined || id === '') return res.status(400).send({ msg: "Invalid or null id", data: null, error: true })
        let updates = Object.keys(data)
        let allowedUpdates = ['name', 'age', 'email', 'password']
        const isValidRequest = updates.every((update)=> allowedUpdates.includes(update))
        if (!isValidRequest) return res.status(400).send({ msg: "Invalid updates", data: null, error: true });

        // const user = await User.findByIdAndUpdate(id,{ $set: data }, {new: true, runValidators: true})
        /**As we need to use middleware we may have to use save() to work with mongoose, as findByIdAndUpdate directly works with mongoDB*/
        const user = await User.findById(req.params.id)
        console.log("user========== old",user)
        if(!user){
            return res.status(404).send({ msg: "No record found for this user", data: null, error: true });
        }
        updates.forEach((update)=> user[update] = data[update])
        console.log("user========== new",user)
        await user.save() 
        return res.status(200).send({ msg: "User has been updated", data: user, error: false });
    }catch(e){
        return res.status(500).send({ msg: e, data: null, error: true });
    }    
})

router.post("/v1/api/login", async (req, res)=>{
    try{
        let updates = Object.keys(req.body.data)
        let allowedUpdates = ['email', 'password']
        const isValidRequest = updates.every((update)=> allowedUpdates.includes(update))
        if (!isValidRequest) return res.status(400).send({ msg: "Bad request format", data: null, error: true });

        /**This method can be use for all, thats why we have used User */
        const user = await User.findByCredentials(req.body.data.email, req.body.data.password)
        /**This method can be triiggered for user, that's why it is 'user.' */
        const token = await user.generateAuthToken()
        return res.status(200).send({ msg: "Login successfull", data: {user, token}, error: false });
    }catch(e){
        return res.status(500).send({ msg: e.toString(), data: null, error: true });
    }    
})

module.exports = router
