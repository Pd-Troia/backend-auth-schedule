require('dotenv').config()
const express = require('express')
const router = require('./router')

//start express
const app = express()
// App configs
app.use(express.json())
app.use(router)

//Start server
const port = process.env.PORT
app.listen(port || "3333")