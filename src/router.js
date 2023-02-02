const express = require('express')
const registerUserController = require('./controller/registerUserController')
const loginUserController = require('./controller/loginUserController')
const validateLoginMiddleware = require('./middlewares/validateLoginMiddleware')
const validateRegister = require('./middlewares/validateRegisterMiddleware')
const registredEmailMiddleware = require('./middlewares/registredEmailMiddleware')
const router = express.Router()

// Home route
router.get('/', (req,res)=> res.status(200).json({msg:"alright"}))

//Resgister route
router.post('/auth/register',   
    registredEmailMiddleware.verifyEmail,
    validateRegister.validate,
    registerUserController.registerUser
)

//Login route
router.post('/auth/login',
    validateLoginMiddleware.validate, 
    loginUserController.loginUser
)
module.exports = router