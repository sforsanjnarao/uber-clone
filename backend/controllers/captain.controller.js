const captainModel=require('../models/captain.model')
const captainService=require('../services/captain.service')

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