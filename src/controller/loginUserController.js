const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const loginUser = async  (req,res)=>{
    //verify if user exist in database
    const {email,password} = req.body
    const user = await User.findOne({email: email})
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
            user.blockTimestamp = Date.now() + 300000  
            await user.save()          
            return res.status(401).json({msg:"User blocked for multiple failed attempts"})
        }else{
        user.failedAttempts = user.failedAttempts + 1;
        await user.save()      
        console.log(user)
        return res.status(401).json({msg:'Incorrect Password'})  
        }      
    }  
    user.failedAttempts = 0
    user.blockTimestamp = 0
    await user.save()  
    // response user id and token
    const secret = process.env.SECRET
    const token = jwt.sign({id: user._id},secret)
    // response
    return res.status(200).json({msg:"Sucessful Login",id: user._id, token})
}

module.exports = {loginUser}