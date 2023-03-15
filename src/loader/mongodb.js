require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const startDB = ()=>{    
    const user = process.env.ISDEV ? process.env.DB_USER_DEV : process.env.DB_USER
    const password = process.env.ISDEV ? process.env.DB_PASS_DEV : process.env.DB_PASS   
    const db = process.env.ISDEV ? process.env.DB_DEV : process.env.DB    
    return mongoose
    .connect(`mongodb+srv://${user}:${password}@cluster0.${db}.mongodb.net/?retryWrites=true&w=majority`)    
}
module.exports = {startDB}