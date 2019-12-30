const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')
const multer = require('multer')

/********Creating User*********/
/**API for creating a user 
 * @param Object
 * @return Object
*/
router.post("/v1/api/create_users", async (req, res)=>{
    try{
        let user = User(req.body)
        await user.save();
        return res.status(200).send({"msg":"User created", "data": user,"error" : false})
    }catch(e){
        return res.status(500).json({"msg":"SERVER-ERROR", "data": e,"error" : true})
    }    
})


/**API for reading user profile
 * @return Object
 */
router.get("/v1/api/get_user/me", auth, async (req, res)=>{
    try{
        res.status(200).send({"msg":"", "data": req.user,"error" : false})
    }catch(e){
        return res.status(500).send({ msg: e, data: null, error: true });
    }
})

/*
    *API fro getting user Data by Id
 * @param id
 * @returns Object
 
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
*/
router.delete("/v1/api/delete_by_id/me", auth, async (req, res)=>{
    try{
        // we are gonne user remove() on mongoose document
        await req.user.remove()
        return res.status(200).send({ msg: "User deleted", data: req.user, error: false });
    }catch(e){
        return res.status(200).send({ msg: e, data: null, error: true });
    }
    
})

/**API fro updating a user's document 
 * @param Object
 * @returns Object
*/
router.patch("/v1/api/update_by_id/me", auth, async (req, res)=>{
    try{
        let {data} = req.body
        let updates = Object.keys(data)
        let allowedUpdates = ['name', 'age', 'email', 'password']
        const isValidRequest = updates.every((update)=> allowedUpdates.includes(update))
        if (!isValidRequest) return res.status(400).send({ msg: "Invalid updates", data: null, error: true });
        updates.forEach((update)=> req.user[update] = data[update])
        await req.user.save() 
        return res.status(200).send({ msg: "User has been updated", data: req.user, error: false });
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
        const token = await user.generateAuthToken()
        return res.status(200).send({ msg: "Login successfull", data: {user, token}, error: false });
    }catch(e){
        return res.send({ msg: e.toString(), data: null, error: true });
    }    
})

/**API for logout user single session
 * @param Object
 * @returns Object
*/
router.post("/v1/api/logout", auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>  token.token !== req.token )
        await req.user.save()
        return res.send({ msg: "Logged out successfully", data: null, error: false });
    }catch(e){
        return res.status(500).send({ msg: e.toString(), data: null, error: true });
    }
})

/**API for logout user from all session
 * @param Object
 * @returns Object
*/
router.post("/v1/api/logoutAll", auth, async (req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        return res.send({ msg: "Logged out successfully", data: null, error: false });
    }catch(e){
        return res.status(500).send({ msg: e.toString(), data: null, error: true });
    }
})

//Configure file properties
/** 
 */
const uploadImage = multer({
    // dest: 'avatars', //removing dest to send image to route to store in DB as binary data
    limits: {
        fileSize: 1000000,
    },
    fileFilter(req, file, cb){
        //using regex to check endpoints
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image file'))
        }
        //return true as everything worked
        cb(undefined, true)
    }
})

/**API to upload user profile
 * @param Object
 * @returns Object
*/
router.post("/v1/api/me/avatar", auth, uploadImage.single('avatar'), async(req, res)=>{
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send("Worked")
},(error, req, res, next)=>{
    res.status(400).send({'error': error.message})
})

module.exports = router
