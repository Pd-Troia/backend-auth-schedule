const mongoose = require('mongoose')
const user = require('user')
// return a message if database couldn't insert data in Data Base
const registerUser = (name,email,password) => {
    try{
        return ""
    }catch(err){
        console.log(err)
        return "Error to insert user in Data Base"
    }
}
module.exports = {registerUserModel}