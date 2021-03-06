const Schema=require('mongoose').Schema
const mongoose=require('mongoose')
const userSchema=Schema({
    email:{type:String,required:true},
    name:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
    address:{type:String},
    lat:{type:mongoose.Schema.Types.Decimal128},
    long:{type:mongoose.Schema.Types.Decimal128},
    DOB:{type:Date,required:true},
    parentName:{type:String,required:true},
    parentName2:{type:String},
    password:{type:String,required:true}
})
const User=mongoose.model('BabyUser',userSchema)
module.exports=User