const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        validate(val) {
            if(val.length < 0 || val.length >50){
                throw new Error("description can't be more than 50 words")
            }
        }
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
    
}, {collection: 'task'})




const Task = mongoose.model("Task", taskSchema)

module.exports = Task