// this middleware verify if the email has been registred
const User = require('../model/User')
const verifyEmail = async(req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email:email})
    return user ? res.status(400).json({msg:"Email already registered"}) : next()     
}
module.exports = {verifyEmail}