// use Yup to validate login
const yup = require('yup')
const validate = async(req,res,next) =>{
    const schema = yup.object({
        email: yup.string().required('campo vazio').email("Insira um email válido"),
        password: yup.string().required('campo vazio')
    })
    try{
        await schema.validate(req.body)        
        next()
    }catch(error){
        return res.status(400).json({error})
    }
}
module.exports = {validate}