const express=require('express')
const router=express.Router();
const {validation, body}=require('express-validator');
const userController=require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage('Invaild email'),
    body('fullname.firstname').isLength({min:3}).withMessage('must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 8 characters')
],userController.registerUser)


router.post('/login',[
    body('email').isEmail().withMessage('Invalide email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], userController.loginUser )

router.get('/profile', authUser,userController.getUserProfile)

router.get('/logout',authUser,userController.logoutUser)







module.exports =router