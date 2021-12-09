const Appointment = require("../Models/Appointment.model")

exports.createSlots=async(req,res)=>{
    const {startTime,docId,endTime,timeGap}=req.body
    const diff=abs(endTime-startTime)
    let min=0
    let hr=startTime
    var timing=null
    let userId=' '
    var slot=' '
    var newApp=null
    for(let i=0;i<diff;i++){
     timing=hr+':'+min
     slot=`${hr}:${min} | ${timeGap}`
     min=(min+timeGap)%60
     if(min==0){
         hr+=1
     }
     newApp=await new Appointment({docId,userId,timing,slot})
     newApp.save()
     .then(result=>{
         return res.status(200).send({message:''})
     })
     .catch(err=>{
        return res.status(500).send({message:''})
     })
    }
}
exports.getSlots=async(req,res)=>{
    const {docId}=req.body
    const foundSlots=await Appointment.find({docId})
    if(foundSlots){
        return foundSlots
    }
    else{
        const error="Fuck off MATE"
        return error
    }
}