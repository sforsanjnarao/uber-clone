const userModel=require('../models/user.model')
const captainModel=require('../models/captain.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel=require('../models/blacklistToken.model')


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

    const isBlacklisted=await blacklistTokenModel.findOne({token: token})
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


    // 1. Extract token from cookies or headers
    // 2. If no token → 401 "No token, authorization denied"
    // 3. Check if token is blacklisted in database means that token still exist in datavase or not
    // 4. If blacklisted → 401 "Token is blacklisted"
    // 5. Verify token using JWT_SECRET
    // 6. Decode token to get `_id`
    // 7.	Find user in MongoDB using _id.
	// 8.	If user not found → 401 “Token is not valid”.
	// 9.	Attach user data to req.user.
	// 10.	Call next() to proceed to the next middleware or route.

}

module.exports.AuthCaptain=async (req,res,next)=>{
    // const token=req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    const authHeader = req.headers.authorization;
const token = req.cookies.token || (authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
console.log(token);

    if(!token){
        return res.status(401).json({message:'No token, authorization denied'})
    }
    
    try{
        const isBlacklisted=await blacklistTokenModel.findOne({token: token})
        
        if(isBlacklisted){
            return res.status(401).json({message:'Token is blacklisted'})
        }
        const decoded= jwt.verify(token, process.env.JWT_SECRET)
        console.log(process.env.JWT_SECRET);
        
        console.log(decoded);
        const captain=await captainModel.findById(decoded._id)
        console.log(captain);
        
        if(!captain) 
            return res.status(401).json({message:'token is not valid'})
        req.captain=captain;
        next();
    }catch(err){
        return res.status(401).json({message:'unAuthrozised'})
    }


    
}