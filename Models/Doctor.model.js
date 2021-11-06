const mongoose=require('mongoose')
const Schema=mongoose.Schema
const DoctorSchema=Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    lat:{type:Number},
    lon:{type:Number},
    type:{type:String},
    timeDiff:{type:Number},
    rating:{type:Number},
    isVerified:{type:Boolean,required:true},
    certificate:{type:String,required:true}
})
const Doctors=mongoose.model('Doctor',DoctorSchema)
module.exports=Doctors