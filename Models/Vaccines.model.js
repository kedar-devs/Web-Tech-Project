const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Vaccine=Schema({
    name:{type:String,rewuired:true},
    time:{type:Number,required:true},
    type:{type:String,required:true},
    Doses:{type:Number},
    secdos:{type:Number}
})
const VaccineData=mongoose.model('VaccineData',Vaccine)
module.exports=VaccineData