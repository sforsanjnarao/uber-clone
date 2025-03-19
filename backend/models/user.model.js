const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstname must be of 3 characters'],
        },
        lastname:{
            type:String,
            required:true,
            minlength:[3,'lastname must be of 3 characters'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'],
        minlength:[5, 'email must be at least 5 characters']
    },
    password:{
        type:String,
        required:true,
        select: false,
    },
    // socketId:{
    //     type:String,
    //     required:true,
    // }

});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id}, process.env.JWT_SECRET,{ expiresIn: '24h'});
    return token; 
}

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashpassword=async function(password){
    const salt=await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const UserModel=mongoose.model('User',userSchema);

module.exports=UserModel;