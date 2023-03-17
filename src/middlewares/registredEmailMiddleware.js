// this middleware verify if the email has been registred
const userModel = require('../model/userModel')
const verifyEmail = async(req,res,next)=>{
    const {email} = req.body
    try{
        const user = await userModel.getUserByEmail(email)
        if(user){
        return res.status(400).json({msg:"Email already registered"})    
        }else{
            req.user = user
            next()
        }
    }catch(err){        
        console.log(err)
        return res.status(500).json("Ocorreu um erro no servidor")
    }  
}
module.exports = {verifyEmail}