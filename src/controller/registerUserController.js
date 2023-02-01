const registerUserModel = require('../model/registerUserModel')
const registerUserController = (req,res) => {
    const {name,email,password} = req.body    
    //register user in DB
    const registerUser = registerUserModel.registerUserModel(name,email,password) 
    // if has string, its a error
    return registerUser 
    ? res.status(402).json({msg: registerUser}) 
    : res.status(200).json({msg: "Sucess to register user"})
}
module.exports = {registerUserController}