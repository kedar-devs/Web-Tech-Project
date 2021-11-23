const Vaccine = require("../Models/VaccineDetails.model")
const VaccineData = require("../Models/Vaccines.model")

exports.createVaccine=async(req,res)=>{
    const {name,type,time,Doses,secdos}=req.body
    const newVaccines=new VaccineData({name,type,time,Doses,secdos})
    newVaccines.save()
    .then(result=>{
        return res.status(200).send({message:'VACCINE DETAILS ADDED SUCCESSFULLY'})
    })
    .catch(err=>{
        return res.status(400).send({message:'Some error occured'})
    })
}
exports.addNewUserVaccine=async(req,res)=>{
    const AvailableVaccine=await VaccineData.find({})
    var body={
        name:'',
        status:false,
        date:'21-09-2021',
        uid:null,
        phoneNumber:999999999,
        userName:'Kedar Devs',
        docName:' '
    }
    if(AvailableVaccine.length)
    for(let i=0;i<AvailableVaccine.length;i++)
    {
        body={
            name:'',
            status:false,
            date:'21-09-2021',
            uid:null,
            phoneNumber:999999999,
            userName:'Kedar Devs',
            docName:' '
        }
        body={
            name:AvailableVaccine[i].name,
            status:false,
            uid:req.body.id,
            phoneNumber:req.body.phoneNumber,
            userName:req.body.name,
            docName:' '
        }
        if(AvailableVaccine[i].type==='M'){
            const date=String(new Date().getDate()+'/'+(new Date().getMonth()+time)+'/'+new Date().getFullYear)
            console.log(date)
            body.date=date

        }
        else{
            const date=String(new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear+time)
            console.log(date)
            body.date=date
        }
        const newVaccines=await new Vaccine({body})
        newVaccines.save()
        .then(result=>{
            console.log('Success')
        })
        .catch(err=>{
            console.log(err)
        })
        return res.status(200).send({message:'Action performed successfully'})
    }
    else{
        return res.status(400).send({message:'Some error Occured'})
    }

}
exports.changeStatus=async(req,res)=>{
    const {docName,id,uid}=req.body
    const foundVaccine=await VaccineData.findOne({_id:id,uid:uid})
    if(foundVaccine){
        foundVaccine.status=true
        foundVaccine.docName=docName
        foundVaccine.save()
        .then(result=>{
            return res.status(200).send({message:'Update successful'})
        })
        .catch(err=>{
            return res.status(500).send({message:'Error Occured'})
        })
    }
    else{
        return res.status(400).send({message:'Please recheck the Id'})
    }
}
exports.getVaccinesUser=async(req,res)=>{
    const foundVaccine=await Vaccine.find({_id:req.body.id})
    if(foundVaccine){
        return res.status(200).send({foundVaccine})
    }
    else{
        return res.status(500).send({message:'User not found'})
    }
}