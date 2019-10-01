const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./mongoose')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const port = 4000 || process.env.PORT
const User = require('./src/model/user')


// Loading React Client 
app.set('client', path.join(__dirname, '/client'));
app.use('/dist', express.static(path.resolve(__dirname, './dist')));
// app.use('/css', express.static(path.resolve(__dirname, './client/public/css')));
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


/**API for creating a user 
 * @param Object
 * @return Object
*/
app.post("/v1/api/create_users", (req, res)=>{
    const user = User(req.body)
    user.save().then(()=>{
       return res.status(400).send({
           "msg":"User created",
           "data": user,
           "error" : false
        })
    }).catch((err)=>{
        return res.status(400).send({
                "msg":err,
                "data": null,
                "error" : true
            })
    })    
})

/**API for getting All user's data
 * @return Object
 */
app.get("/v1/api/get_users", async (req, res)=>{
    User.find({}).then((users)=>{
        return res.status(200).send({
            msg: null,
            data: users,
            error: false
        })
    }).catch((er)=>{
        return res.status(500).send({
            msg: er,
            data: null,
            error: true
        })
    })
})

/**API fro getting user Data by Id
 * @param id
 * @returns Object
 */
app.get("/v1/api/user_by_id/:id", async (req, res)=>{
    let _id = req.params.id
    //using select to not send _v in response
    User.findById(_id).select("-__v").then((user)=>{
        if(!user) {
            return res.status(404).send({
                "msg":"User not Found",
                "data": null,
                "error" : true
            })
        }
        return res.status(200).send({
            msg: null,
            data: user,
            error: false
        })
    }).catch((er)=>{
        return res.status(500).send({
            msg: er,
            data: null,
            error: true
        })
    })
})

app.delete("/v1/api/delete_by_id/:id", async (req, res)=>{
    let _id = req.params.id
    User.findByIdAndDelete(_id).select("-password").then((user)=>{
        console.log("user==========",user)
        if(user === null) return res.status(404).send({ msg: "User not found", data: null, error: true })
        return User.countDocuments({ age: 0 });
    }).then((result)=>{
        console.log("result==========",result)
    }).catch((e)=>{
        console.log("e==========",e)
    })
    
})

/**API fro updating a user's document 
 * @param Object
 * @returns Object
*/



app.get('*', function (req, res) {
    res.sendFile('./index.html', { root: path.join(__dirname, './client/public') });
})


app.listen(port, ()=>{
    console.log("server is running on", port)
})