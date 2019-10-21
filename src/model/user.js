const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(val) {
            if(val < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) throw new Error('Invalid Email')
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        // select: false,  // to not send on find requests
        validate(val){
            if(val.toLowerCase().includes('password')){
                throw new Error("Password can't be password")
            }
        }
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
}, {collection: 'user'})



/**Method to send profile data 
 * return user Object for profile
*/
userSchema.methods.toJSON =  function () {
    let user = this
    //mongoose function for creating object
    let userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.__v
    return userObject
}

/**Checking user availability */
/**this is a model method */
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({email})
    if(!user) throw new Error('No user found for this Email')
    const isMached = await bcrypt.compare(password, user.password)
    if(!isMached) throw new Error('Wrong Password')
    return user
}

/**Methods are used for instances */
userSchema.methods.generateAuthToken = async function () {
    let user = this
    //generate jwt
    const token = jwt.sign({_id: user._id.toString()}, "Task-Manager-App")
    //storing token in user's data
    user.tokens = user.tokens.concat({ token })
    await user.save();
    return token
}

/**Middelware for password hashing 
pre is for before function call, (mongooseQueryr, standad function not an arrow function)
= reffering this as the data('user') which is going to be saved
= next() will assure that the process of this pre() has been done
*/
userSchema.pre('save', async function(next){
     let user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
     next()
})

const User = mongoose.model("User", userSchema)

module.exports = User

// const UserName = new User({ name: "uday", age: 24, email: "reachudaysingh@gmail.com" })

// UserName.save().then((res) => console.log("data saved=============", res)).catch((e) => console.log("er============", e))