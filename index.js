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


app.post("/v1/api/users", (req, res)=>{
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


app.get('*', function (req, res) {
    res.sendFile('./index.html', { root: path.join(__dirname, './client/public') });
})


app.listen(port, ()=>{
    console.log("server is running on", port)
})