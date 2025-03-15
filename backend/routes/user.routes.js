const express=require('express')
const router=express.Router();
const {validation, body}=require('express-validator');
const userController=require('../controllers/user.controller')


router.post('/register', [
    body('email').isEmail().withMessage('Invaild email'),
    body('fullname.firstname').isLength({min:3}).withMessage('must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 8 characters')
],userController.registerUser)


module.exports =router