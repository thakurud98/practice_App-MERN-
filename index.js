const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// Loading React Client 
app.set('client', path.join(__dirname, '/client'));
app.use('/dist', express.static(path.resolve(__dirname, './dist')));
// app.use('/css', express.static(path.resolve(__dirname, './client/public/css')));
// app.use('/images', express.static(path.resolve(__dirname, './client/public/images')));
// app.use('/js', express.static(path.resolve(__dirname, './client/public/js')));

app.get('*', function (req, res) {
   
    res.sendFile('./index.html', { root: path.join(__dirname, './client/public') });
})

const port = 3000 || process.env.PORT
app.listen(port, ()=>{
    console.log("server is running on", port)
})