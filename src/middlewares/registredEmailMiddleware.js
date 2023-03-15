// this middleware verify if the email has been registred
const userModel = require('../model/userModel.js')
const verifyEmail = async(req,res,next)=>{
    const {email} = req.body
    const user = await userModel.getUserByEmail(email)
    if(user){
       return res.status(400).json({msg:"Email already registered"})    
    }else{
        req.user = user
        next()
    }  
}
module.exports = {verifyEmail}