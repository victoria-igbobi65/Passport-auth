const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user')
require('dotenv').config()




const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
require('./authentication/auth')
app.use("/", userRoute);

const PORT = process.env.PORT || 8000
const mongo_url = process.env.DB_URL


//console.log(PORT)

// DB CONNECTION
mongoose.connect(mongo_url)
mongoose.connection.on('connected', ()=>{
    console.log('DB connection succesful!')
})
mongoose.connection.on('error', (err)=>{
    console.log(err)
})

app.use((err, req, res)=>{
    res.statusCode(400).json({
        err
    })
})

app.listen(PORT, ()=>{
    console.log('Server is running!')
})
