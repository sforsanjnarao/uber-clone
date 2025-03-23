const express=require('express')
const router=express.Router();
const { body}=require('express-validator');
const captainController=require('../controllers/captain.controller');
const authMiddleware=require('../middlewares/auth.middleware')

router.post('/register',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('fullname.firstname').isLength({min:6}).withMessage('firstname must be 6 characterlong'),
    body('vehicle.color').isLength({min:3}).withMessage('character must be of 3 length'),
    body('vehicle.plate').isLength({min:3}).withMessage('character must be of 3 length'),
    body('vehicle.capacity').isNumeric().withMessage('capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('vehicle type must be car, bike or auto')
],captainController.RegisterCaptain)

router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],captainController.loginCaptain)

router.get('/profile',authMiddleware.AuthCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.AuthCaptain,captainController.logoutCaptain)

module.exports=router