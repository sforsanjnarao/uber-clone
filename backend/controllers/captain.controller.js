const captainModel=require('../models/captain.model')
const captainService=require('../services/captain.service')
const blacklistTokenModel=require('../models/blacklistToken.model')

const {validationResult}=require('express-validator')


module.exports.RegisterCaptain=async (req,res,next)=>{
     const err=validationResult(req);
     if(!err.isEmpty()){
        return res.status(400).json({errors:err.array()})
     }
     const {fullname, email, password, vehicle}=req.body;
     try{
      const isCaptainAlredyExists=await captainModel.findOne({email:email})
     if(isCaptainAlredyExists){
         return res.status(400).json({message:'Captain with this email already exists'})
     }
     const hashedPassword=await captainModel.hashPassword(password);

     const captain=await captainService.createCaptain({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashedPassword,
            color:vehicle.color,
            plate:vehicle.plate,
            capacity:vehicle.capacity,
            vehicleType:vehicle.vehicleType
     })
     const token =captain.generateAuthToken(captain);
     res.status(201).json({token:token, captain:captain})
     }catch(err){
      console.error(err)
      next(err)
     }
}

//login route
module.exports.loginCaptain=async (req,res,next)=>{
     const {email, password}=req.body;
     try{
      const captain=await captainModel.findOne({email}).select('+password')
      if(!captain){
         return res.status(400).json({message:'Invalid email or password'})
      }
      const isMatch=await captain.comparePassword(password);
      if(!isMatch){
         return res.status(400).json({message:'Invalid email or password'})
      }
      const token= await captain.generateAuthToken(captain)
      res.json({token:token, captain:captain})
     }catch(err){
      console.error(err)
      next(err)
     }
}

module.exports.getCaptainProfile=async (req,res,next)=>{
    res.status(200).json(req.captain)
}

//logout route
module.exports.logoutCaptain=async (req,res,next)=>{
     try{
         res.clearCookie('token');
         const token =req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
         await blacklistTokenModel.create({token});
         res.status(200).json({message:'Logged out successfully'})
         next();
     }catch(err){
         console.error(err)
         next(err)
     }
}