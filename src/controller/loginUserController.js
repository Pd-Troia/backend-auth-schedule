const bcrypt = require('bcrypt')
const { response } = require('express')
const jwt = require('jsonwebtoken')
const loginUser = (req,res)=>{
    const {email,password} = req.body
    const user = {}
    // confirm if password is equal in DB
    const passwordhash = ""
    // Generate JWT Token
    const passwordCompare = bcrypt.compare(password,passwordhash)
    if(!passwordCompare){ 
        return res.status(402).json({msg:'Incorrect Password'})
    }
    // response user id and token
    const secret = process.env.SECRET
    const token = jwt.sign({id: user._id},secret)
    // response
    return res.status(200).json({id: user._id, token, msg:"Sucessful Login"})
}

module.exports = {loginUser}