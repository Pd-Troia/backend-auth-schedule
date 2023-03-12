const userModel = require('../model/userModel.Js')
const bcrypt = require('bcrypt')

const registerUser = async(req,res) => {
    const {firstName,lastName,email,password} = req.body     
    //create hash 
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)
    // create user
    try{
        await userModel.createUser(firstName,lastName,email,passwordHash)  
        res.status(200).json({msg: "Sucess to register user"})
    }catch(err){
        console.log(err)
        return res.status(500).json({msg:"Ocorreu um erro no servidor"})
    }
}
module.exports = {registerUser}