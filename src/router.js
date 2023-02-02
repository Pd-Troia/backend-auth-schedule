const express = require('express')
const registerUserController = require('./controller/registerUserController')
const confirmPassowordMiddleware = require('./middlewares/confirmPaswordMiddleware')
const loginUserController = require('./controller/loginUserController')
const validateLogin = require('./middlewares/validateLoginMiddleware')
const validateRegister = require('./middlewares/validateRegisterMiddleware')
const router = express.Router()

// Home route
router.get('/', (req,res)=> res.status(200).json({msg:"alright"}))

//Resgister route
router.post('/auth/register',   
    validateRegister.validate,
    registerUserController.registerUser
)

//Login route
// router.post('/auth/login',
//     validateLogin.validate, 
//     loginUserController.loginUser
// )
module.exports = router