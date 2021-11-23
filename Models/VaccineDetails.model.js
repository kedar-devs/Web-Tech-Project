const mongoose=require('mongoose')
const Schema=mongoose.Schema
const VaccineDetailSchema=Schema({
    name:{type:String,required:true},
    status:{type:Boolean,required:true},
    date:{type:String,required:true},
    uid:{type:mongoose.Schema.Types.ObjectId,required:true},
    phoneNumber:{type:Number,required:true},
    userName:{type:String,required:true},
    docName:{type:String,required:true}
})
const Vaccine=mongoose.model('Vaccine',VaccineDetailSchema)
module.exports=Vaccine