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

    // Verify Password
    const passwordhash = user.password 
    const passwordCompare = await bcrypt.compare(password,passwordhash)  
    console.log(password, passwordhash)   
    console.log(passwordCompare)
    if(!passwordCompare){ 
        return res.status(422).json({msg:'Incorrect Password'})
    }
    // response user id and token
    const secret = process.env.SECRET
    const token = jwt.sign({id: user._id},secret)
    // response
    return res.status(200).json({msg:"Sucessful Login",id: user._id, token})
}

module.exports = {loginUser}