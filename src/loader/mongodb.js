require('dotenv').config()
const mongoose = require('mongoose')
const connection = {connected: false}
const startDB = ()=>{        
    const user = process.env.DB_USER
    const password = process.env.DB_PASS        
    return mongoose
    .connect(`mongodb+srv://${user}:${password}@cluster0.qzrwirw.mongodb.net/?retryWrites=true&w=majority`)    
      
    
}
module.exports = {startDB}