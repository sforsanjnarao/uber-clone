const mongoose= require('mongoose');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')

const captainSchema=new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'firstname must be of 3 characters'],
        },
        lastname:{
            type:String,
            minlength:[3,'lastname must be of 3 characters'],
        }
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    }, 
    password:{
        type:String,
        required:true,
        minlength:[8,'Password must be at least 8 characters long'],
        select:false //not sending this field in response
    },

    // socketId:{
    //     type:String,
    //  }

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },

    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,'color must be of 3 character']
        },
        plate:{
            type:String,
            required:true,
            minlength:[3,'plate must be of 3 character'],
            unique:true
        },
        capacity: {
            type:Number,
            required:true,
            min:1,
            max:5
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto']
        }

    },
    location:{
        lat:{
            type:Number,
             
        },
        lng:{
            type:Number,
             
        }
    }

})

captainSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    return token;
}

captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}

const Captain=mongoose.model('Captain',captainSchema)

module.exports=Captain;