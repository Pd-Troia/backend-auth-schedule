const User = require('./User.js')

const getUserByEmail = async(email) =>{
    try{
        const user = await User.findOne({email})
        return user
    }catch(err){        
        throw new Error("Ocorreu um erro no servidor")
    }
}
const createUser = async(firstName,lastName,email,passwordHash)=>{
    try{
        const user = await User({firstName,lastName,email,password:passwordHash,failedAttempts: 0,blockTimestamp: 0})
        await user.save()
    }catch(err){        
        throw new Error("Ocorreu um erro no servidor")
    }
}
const blockUser = async(user)=>{
    user.blockTimestamp = Date.now() + 300000  
    await user.save()  
}
const inscraseFailedAttempts = async(user)=>{
    user.failedAttempts = user.failedAttempts + 1;
    await user.save() 
}
const desblockUser = async(user)=>{
    try{
        user.failedAttempts = 0
        user.blockTimestamp = 0
        await user.save() 
    }catch(err){        
        throw new Error('Ocorreu um erro no servidor ao tentar desbloquear o usuário')
    }
}
module.exports= {
    getUserByEmail,
    createUser,
    blockUser,
    inscraseFailedAttempts,
    desblockUser
}