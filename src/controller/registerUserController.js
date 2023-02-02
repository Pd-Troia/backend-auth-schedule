const User = require('../model/User')
const bcrypt = require('bcrypt')
const registerUser = async(req,res) => {
    const {firstName,lastName,email,password} = req.body     
    //create hash 
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    // create user
    const user = User({firstName,lastName,email,password:passwordHash})    
    //register user in DB    
    try{        
        await user.save()
        res.status(200).json({msg: "Sucess to register user"})
    }catch(err){
        console.log(err)
        res.status(402).json({msg: "Fail to register"}) 
    }
    // if has string, its a error
    
}
module.exports = {registerUser}