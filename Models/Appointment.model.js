const mongoose=require('mongoose')
const Schema=mongoose.Schema
const AppointmentSchema=new Schema({
    docId:{type:mongoose.Schema.Types.ObjectId,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,required:true},
    slot:{type:String,required:true},
    timing:{type:String,required:true}
})
const Appointment=mongoose.model('Appointment',AppointmentSchema)
module.exports=Appointment
