const confirmPassword = (req,res,next)=>{
    const {password,confirmPassword} = req.body
    return (password == confirmPassword) 
    ? next()
    : res.status(402).json({msg: "Password not equal confirmPassoword"})
}
module.exports = {confirmPassword}