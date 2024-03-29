const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')

const loginUser = async  (req,res)=>{
    //verify if user exist in database
    const {email,password} = req.body
    try{
        const user = await userModel.getUserByEmail(email)
        if(!user){
            return res.status(404).json({msg: "email não cadastrado"})
        }  
        // verify if user is blocked
        if(user.blockTimestamp != 0 && Date.now() < user.blockTimestamp){ 
            return res.status(401).json({msg: "User blocked"})
        }
        // Verify Password
        
        const passwordhash = user.password 
        const passwordCompare = await bcrypt.compare(password,passwordhash)     
        if(!passwordCompare){ 
            if(user.failedAttempts > 3){ 
                await userModel.blockUser(user)        
                return res.status(401).json({msg:"User blocked for multiple failed attempts"})
            }else{
            await userModel.inscraseFailedAttempts(user)       
            return res.status(401).json({msg:'Incorrect Password'})  
            }      
        }  
        userModel.desblockUser(user) 
    
    // response user id and token
    const secret = process.env.SECRET       
    const token = await jwt.sign({id: user._id},secret, {algorithm:"HS256"})
    // response
    return res.status(200).json({msg:"Sucessful Login",id: user._id, token})
    }catch(err){
        console.log(err)
        res.status(501).json({msg:"Ocorreu um erro no servidor"})
    }
}

module.exports = {loginUser}