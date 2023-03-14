const mongoose = require('mongoose')


const schema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    failedAttempts: Number,
    blockTimestamp: Number, 
})
const User = mongoose.model('User', schema)

module.exports = User