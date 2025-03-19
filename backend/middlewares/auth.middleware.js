const userModel=require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser=async (req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1]; 
                //what that ? mark is doing
                //What It Does?

                // It prevents errors when accessing properties that might be undefined or null.
                // How It Works in This Case?

                // •	req.headers.authorization might be undefined if the request does not include an Authorization header.
                // •	?. checks if req.headers.authorization exists.
                // •	If it exists, it calls .split(' ').
                // •	If it doesn’t, it returns undefined instead of throwing an error.
    if(!token){
        return res.status(401).json({message:'No token, authorization denied'})
    }

    const isBlacklisted=await userModel.findOne({token: token})
    if(isBlacklisted){
        return res.status(401).json({message:'Token is blacklisted'})
    }

    try {
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decode._id)
        if(!user){
            return res.status(401).json({message:'Token is not valid'})
        };
        req.user=user; //getting all user data from moongodb and we are sending it in the req.user, which we featch in the profile and other routes
        next();

    } catch (err) {
        return res.status(401).json({message:'unAuthrozise'})
    }

}