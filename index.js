const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./mongoose')
const jwt = require('jsonwebtoken')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const port = 4500 || process.env.PORT
const userRouter = require('./src/routes/user');
const taskRouter = require('./src/routes/task');


// Loading React Client 
app.set('client', path.join(__dirname, '/client'));
app.use('/dist', express.static(path.resolve(__dirname, './dist')));
// app.use('/css', express.static(path.resolve(__dirname, './client/public')));
// app.use('/images', express.static(path.resolve(__dirname, './client/public/images')));
// app.use('/js', express.static(path.resolve(__dirname, './client/public/js')));

/**API for sse connection which stays connected */
app.get('/sse-server', function(req, res){
    res.status(200).set({
        "connection": "keep-alive",
        "cache-control": "no-cache",
        "content-type": "application/json",
    })
    const data = {
        msg : "Hello world"
    }
    setInterval(()=>{
        data.timestamp = Date.now()
        res.write(JSON.stringify(data))
    },5000)
})

/**Using routes */
app.use(userRouter);
app.use(taskRouter);


/**API for creating a user 
 * @param Object
 * @return Object
*/
/*
app.post("/v1/api/create_users", async (req, res)=>{
    try{
        let user = User(req.body)
        await user.save();
        return res.status(200).json({"msg":"User created", "data": null,"error" : false})
    }catch(e){
        console.log("e=============",e)
        return res.status(500).json({"msg":"SERVER-ERROR", "data": e,"error" : true})
    }    
})
*/


app.get('*', function (req, res) {
    res.sendFile('./index.html', { root: path.join(__dirname, './client/public') });
})


app.listen(port, ()=>{
    console.log("server is running on", port)
})



/**Example for bcrypt for hashing password*/
// const brcypt = require('bcryptjs')
// const myFunctoin = async (pass) => {
//     // bcrypt does indeed use promises
//     const hashPass = await brcypt.hash(pass, 8)   //returns promise, takes 2 arguments (string, algorithm)
//     console.log("password", pass)
//     console.log("hash password", hashPass)

//     //to check encrypted value
//     const res = await brcypt.compare(pass, hashPass)
//     console.log("password matched", res)

// }


/** example of JWT for tokens */
// const myFunctoin = async () => {
//     try{
//         let token = jwt.sign({"id": "123456789"}, "myTaskApp", {expiresIn: '15 seconds'})
//         console.log("token=========", token)
        
//         const data = jwt.verify(token, "myTaskApp")
//         console.log("data=========", data)
//     }catch(e){
//         console.log(e)
//     }
// }

/**Exampl of db relation */
const myFunction = async () => {
    const Task = require('./src/model/task')
    const User = require('./src/model/user')
    try{
        const task = await Task.findById('5dad73a8c8ed4c38e338d3f2')
        await task.populate('owner').execPopulate()
        console.log('owner from populate===========', task.owner)
    }catch(e) { console.log("eroo=-===========",e)}
}

myFunction()
// myFunctoin("Red123!") for bcrypt
