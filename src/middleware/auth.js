const jwt = require('jsonwebtoken')
const User = require('../model/user')
const auth = async (req, res, next) => {
    try{
        // let token = req.header('Authorization').replace("Bearer ","")
        // console.log("token=========", token)
        // let decode = jwt.verify(token, "Task-Manager-App")
        // const user = await User.findOne({_id: decode._id, 'tokens.token': token})
        // console.log("user ==================", user)
        // // if()
        next()
    } catch(e){

    }
    
}


module.exports = auth