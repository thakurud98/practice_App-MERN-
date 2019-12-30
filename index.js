const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./mongoose')
const jwt = require('jsonwebtoken')
const port = process.env.PORT || 3000
const userRouter = require('./src/routes/user');
const taskRouter = require('./src/routes/task');
const socialRouter = require('./src/routes/social')
/**SOcial login setup */
//Cors for accepting user HTTP request
var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');


app.use(cors(corsOption))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


// const multer = require('multer')
// const upload = multer({
//     dest: 'image'
// })
// app.post("/upload", upload.single('upload'), (req, res)=>{
//     res.status(200).send("worked")
// })


// Loading React Client 
app.set('client', path.join(__dirname, '/client'));
app.use('/dist', express.static(path.resolve(__dirname, './dist')));
app.use('/css', express.static(path.resolve(__dirname, './client/public/css')));
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
app.use('/api/v1/', socialRouter);

app.get('*', function (req, res) {
    res.sendFile('./index.html', { root: path.join(__dirname, './client/public') });
})


app.listen(port, ()=>{
    console.log("server is running on", port)

})
