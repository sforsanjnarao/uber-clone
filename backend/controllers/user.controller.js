const userModel=require('../models/user.model')
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')
const authMiddleware=require('../middlewares/auth.middleware')
const blacklistTokenModel=require('../models/blacklistToken.model')

module.exports.registerUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {fullname,email,password}=req.body;

    try{
        const isUserAlredyExists=await userModel.findOne({email:email})
        if(isUserAlredyExists){
            return res.status(400).json({message:'User alredy exists'})
        }
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

module.exports.loginUser=async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    const user=await userModel.findOne({email}).select('password');
    if(!user){
        return res.status(401).json({message:'Invalid email or password'})
    }
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'invalid email or password'})
    }
    const token=user.generateAuthToken(user)

    res.cookie('token', token);

    res.status(200).json({token:token, user})
}


module.exports.getUserProfile=async (req,res,next)=>{
    res.status(201).json(req.user)
}


module.exports.logoutUser=async (req,res,next)=>{
    try{
        res.clearCookie('token'); //clearing the token from the cookie
        const token =req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
        
        await blacklistTokenModel.create({token});
        res.status(201).json({message:'Logged out successfully'})
        next();
    }catch(err){
        console.error(err)
        next(err)
    }
    // 1. Extract token from cookies or headers
    // 2. If no token → 200 "Logged out successfully"
    // 3. Create a new document in blacklistTokenModel with the extracted token
    // 4. Call next() to proceed to the next middleware or route.
    // 5. Clear the token from the cookies.
    // 6. Return 200 "Logged out successfully"
    // 7. Log the user out.
    // 8. If you want to delete the token from the database, you can use the token as a unique identifier.
    // 9. Delete the document in blacklistTokenModel.
}