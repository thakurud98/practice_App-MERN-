
const mongoose = require('mongoose')
const connectionUrl = 'mongodb://127.0.0.1:27017/'
const dataBase = 'Task-Manager-App'
var validator = require('validator')


mongoose.connect(connectionUrl+dataBase, {useCreateIndex: true, useNewUrlParser: true})
