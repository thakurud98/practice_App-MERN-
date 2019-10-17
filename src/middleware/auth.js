const jwt = require('jsonwebtoken')
const User = require('../model/user')
const auth = async (req, res, next) => {
    try{
        console.log("header=========",req.header('Authorization'))
        let token = req.header('Authorization').replace("Bearer ","")
        let decode = jwt.verify(token, "Task-Manager-App")
        if(decode._id === undefined) return res.status(401).send({"msg":"Invalid token", "data": null,"error" : true})
        const user = await User.findOne({_id: decode._id, 'tokens.token': token})
        if(!user) throw new Error()
        req.token = token
        req.user = await user
        next()
    } catch(e){
        res.status(401).send({"msg":"Please Authenticate", "data": e,"error" : true})
    }
    
}


module.exports = auth