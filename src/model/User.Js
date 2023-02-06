const mongoose = require('mongoose')
const { number } = require('yup')
const User = mongoose.model("User",{
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    failedAttempts: Number,
    blockTimestamp: Number,
})

module.exports= User