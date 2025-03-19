const mongoose=require('mongoose')

const blacklistTokenSchema={
    token:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400 // 24
    }
}

const BlacklistTokenModel=mongoose.model('BlacklistToken',blacklistTokenSchema)

module.exports=BlacklistTokenModel;