require('dotenv').config()
const cors = require('cors')
const mongodb = require('./loader/mongodb')
const express = require('express')
const router = require('./router')

//start express
const app = express()
// App configs
app.use(cors())
app.use(express.json())
app.use(router)


//Start server if connect DB
const isConnected = mongodb.startDB()
isConnected.then(()=>{    
    const port = process.env.PORT
    app.listen(port || 3333)
    console.log("App listen on port " + port)
})
.catch((err)=>console.log(err))

