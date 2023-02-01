const express = require('express')
const registerUserController = require('./controller/registerUserController')
const confirmPassowordMiddleware = require('./middlewares/confirmPaswordMiddleware')
const loginUserController = require('./controller/loginUserController')
const validateLogin = require('./middlewares/validateLogin')
const validateRegister = require('./middlewares/validateRegister')
const router = express.Router()

// Home route
router.get('/', (req,res)=> res.status(200).json({msg:"alright"}))

//Resgister route
router.post('/auth/register',
    validateRegister.validate,
    confirmPassowordMiddleware.confirmPassword,
    registerUserController.registerUser
)

//Login route
router.post('/auth/login',
    validateLogin.validate,
    loginUserController.loginUser
)
module.exports = router