const express = require('express')
const registerUserController = require('./controller/registerUserController.js')
const loginUserController = require('./controller/loginUserController.js')
const validateLoginMiddleware = require('./middlewares/validateLoginMiddleware.js')
const validateRegister = require('./middlewares/validateRegisterMiddleware.js')
const registredEmailMiddleware = require('./middlewares/registredEmailMiddleware.js')
const router = express.Router()

// Home route
router.get('/', (req,res)=> res.status(200).json({msg:"alright"}))

//Resgister route
router.post('/auth/register',   
    validateRegister.validate,
    registredEmailMiddleware.verifyEmail,
    registerUserController.registerUser
)

//Login route
router.post('/auth/login',
    validateLoginMiddleware.validate, 
    loginUserController.loginUser
)
module.exports = router