const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
require('./mongoose')
const jwt = require('jsonwebtoken')
const port = 4500 || process.env.PORT
const userRouter = require('./src/routes/user');
const taskRouter = require('./src/routes/task');


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


const multer = require('multer')
//configure multer for files like only pdf's, images's doc's etc
//we may hve to configure multer for multiple times for a single application depending on the needs
//this is just for learning in the file, will allow any file to upload to the server
const upload = multer({
    dest: 'image'
})
//calling multer() with an instance, which is an option object where we provide all the configuration tool, for the moment we provide just one property
//called 'dest' which is use for destination, and this is the only one we need ot get started. here we provide the name of the folder where all of the uploaded
//files will be stored. "dest: 'images'"
//let create an endpoint to upload file
//for supporting upload, we get access to the middleware from the multer library. 
//upload.single() it will return a middleware which is we need to use. it requires single argument which is a name for upload
//upload.single('upload')
// 07:00
/**
* open postman add route in body select form-data in this select file and upload the file and use key as 'upload'
when we hit send, then multer will going to look for the file  called upload which we specified in upload.single('upload') in the request middleware
and then it save it into images directory, defined in  dest: 'images'
which will be created automatically in projects. if things went well then file will be saved in /images dir
but the file will be stored as binary data, because its name which is randomly generated
*/
app.post("/upload", upload.single('upload'), (req, res)=>{
    res.status(200).send("worked")
})


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

app.get('*', function (req, res) {
    res.sendFile('./index.html', { root: path.join(__dirname, './client/public') });
})


app.listen(port, ()=>{
    console.log("server is running on", port)

})
