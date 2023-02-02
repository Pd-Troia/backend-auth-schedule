require('dotenv').config()
const mongodb = require('./loader/mongodb')
const express = require('express')
const router = require('./router')

//start express
const app = express()
// App configs
app.use(express.json())
app.use(router)

//Start server if connect DB
const isConnected = mongodb.startDB()
isConnected.then(()=>{
    console.log("conectado ao banco");
    const port = process.env.PORT
    app.listen(port || "3333")
    console.log("app listen on " + port)
})
.catch((err)=>console.log(err))

