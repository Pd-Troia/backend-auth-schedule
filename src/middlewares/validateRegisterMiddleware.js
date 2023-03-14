// use Yup to validate login
const yup = require('yup')

const validate = async (req,res,next) =>{
    //validate terms    
    const regexName = new RegExp("^[A-ZÀ-ÖØ-Ý][a-zà-öø-ý]*(\s[A-ZÀ-ÖØ-Ý][a-zà-öø-ý]*)*$")    
    const regexPassword = new RegExp("^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$")
    const schema = yup.object({
        firstName: yup.string().required('Campo Obrigatorio').matches(regexName, 'Nome inválido'),
        lastName: yup.string().required('Campo Obrigatorio').matches(regexName, 'Nome invalido'),
        email: yup.string().email('Deve ser inserido um email válido').required('Campo Obrigatorio'),
        password: yup.string().required('Campo Obrigatorio').min(6, 'Minimo de 6 caracteres').matches(
                regexPassword,
                'A senha deve conter uma letra minúscula, letra minúscula, caracteres especiais(!#@$%&) e um número '
            ),
        confirmPassword: yup.string().required('Campo Obrigatorio').min(6, 'Minimo de 6 caracteres')
            .test('confirmPassword','Senhas diferentes',
                (value, context) => context.parent.password === value
            ),
    }) 
    //response to validation schema
    try{
        await schema.validate(req.body)
        return next()
    }catch(error){
       return res.status(400).json({error})
    }
        
}
module.exports = {validate}