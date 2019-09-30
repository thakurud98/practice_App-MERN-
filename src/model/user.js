const mongoose = require('mongoose')
const validator = require('validator')




const User = mongoose.model("User", {
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
        validate(val) {
            if (!validator.isEmail(val)) throw new Error('Invalid Email')
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(val){
            if(val.toLowerCase().includes('password')){
                throw new Error("Password can't be password")
            }
        }
    }
}, "user")

module.exports = User

// const UserName = new User({ name: "uday", age: 24, email: "reachudaysingh@gmail.com" })

// UserName.save().then((res) => console.log("data saved=============", res)).catch((e) => console.log("er============", e))