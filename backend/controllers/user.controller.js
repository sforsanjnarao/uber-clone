const userModel=require('../models/user.model')
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')

module.exports.registerUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password}=req.body;
    try{
        const hashedPassword=await userModel.hashpassword(password);
        const user=await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword
        })
        const token=user.generateAuthToken(user)

        res.status(201).json({token:token, user:user})
    }catch(err){
        console.error(err)
        next(err)
    }
    


}