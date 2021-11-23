const { response } = require("express")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const saltRound=8
const nodemailer=require('nodemailer')
const Doctors = require("../Models/Doctor.model")

exports.newDoctor=async(req,res)=>{
    const {name,address,phoneNumber,lat,lon,type,timeDiff,rating,email,password}=req.body
    const url=req.protocol+'://'+req.get('host')
    let sampleFile=req.files.certificate
    let uploadPath='./Data/'+sampleFile.name
    await sampleFile.mv(uploadPath,async function(err) {
        if (err)
          return res.status(500).send(err);
        
        console.log("Success At Certificate Upload")
        const certificate=url+'/Data/'+sampleFile.name
        const isVerified=true
        const accessToken=' '
        const newDoctor=await new Doctors({name,address,phoneNumber,lat,lon,type,timeDiff,rating,certificate,isVerified,email,password,accessToken})
        bcrypt.hash(newDoctor.password,saltRound,(err,hash)=>{
            if(err){
            return res.status(400).send({message:'Error occured while saving password'})
            }
            else{
                newDoctor.password=hash
                newDoctor.save()
                .then(result=>{
                    return res.status(200).send({message:'Doctor Added successfully'})
                })
                .catch(err=>{
                    return res.status(400).send({message:'An error has Occured'})
                })
            }
        })
       
    })
}
exports.varifyDoc=async(req,res)=>{
    const {id}=req.body
    const FoundDoctor=await Doctors.findOne({_id:id})
    FoundDoctor.isVerified=true
    FoundDoctor.save()
    .then(result=>{
        // return res.status(200).send({message:'Doctor Verified'})
        transporter.sendMail({
            from: 'kedard249.kd@gmail.com',
            to: `${FoundUser.email}`,
            subject: 'An Attached File',
            text: `Hi ${FoundDoctor.name}
            Your Status has been verified, you are now an official user
            `,
            function(err, info) {
              if (err) {
                console.error(err);
                return res.status(400).send({message:'Sorry we couldnt sent an email'})
              } else {
                console.log(info);
                return res.status(200).send({message:'Mail sent successfully'})
              }
            }
          });
    })
    .catch(err=>{
        return res.status(400).send({message:'Error has Occured'})
    })
}
exports.LoginDoc=async(req,res)=>{
    const {email,password}=req.body
    const FoundUser=await Doctors.findOne({email})
    if(FoundUser){
        bcrypt.compare(FoundUser.password,password).then(isMatch=>{
            if(isMatch){
                    let payload={user:FoundUser._id}
                    let token=jwt.sign(payload,process.env.SECRET_KEY)
    
                    res.status(200).send({user,token})
            }
            else{
                res.status(401).send('invalid Password')
            }
        })
    }
    else{
        res.status(401).send('invalid Email')
    }
}
exports.getVerifiedDoctor=async(req,res)=>{
    const foundUser=await Doctors.find({isVerified:true})
    if(foundUser){
    return res.status(200).send({foundUser})
    }
    else{
        return res.status(400).send({message:'Error Occured'}) 
    }
}
exports.getDoctor=async(req,res)=>{
    const foundUser=await Doctors.find({})
    if(foundUser){
    return res.status(200).send({foundUser})
    }
    else{
        return res.status(400).send({message:'Error Occured'}) 
    }
}
