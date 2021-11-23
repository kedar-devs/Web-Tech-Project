const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=require('./../Models/User.model')
const saltRound=8
const nodemailer=require('nodemailer')
const Vaccine = require('../Models/VaccineDetails.model')
const { PDFDocument, StandardFonts, rgb }=require('pdf-lib')
exports.RegisterUser=async(req,res)=>{
    const {email,name,phoneNumber,DOB,parentName,parentName2,password,lat,long,address}=req.body
    const FoundUser=await User.findOne({email})
    if(FoundUser){
        return res.status(500).send({message:'User already exists'})
    }
    else{
        const newUser=new User({email,name,phoneNumber,DOB,parentName,parentName2,password,lat,long,address})
        bcrypt.hash(newUser.password,saltRound,(err,hash)=>{
            newUser.password=hash
            newUser.save()
            .then(result=>{
                return res.status(200).send({message:'User Added successfully'})
            })
            .catch(err=>{
                return res.status(500).send({message:'There was an error while storing the user'})
            })
        })
    }
}
const LoginUser=async(req,res)=>{
    const {email,password}=req.body
    const FoundUser=await User.findOne({email})
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
exports.ProvideCertificate=async(req,res)=>{
    const {_id}=req.body
    const foundVaccineDetails=await Vaccine.findOne({_id})
    const FoundUser=await User.findOne({_id:foundVaccineDetails.uid})
    const pdfDoc = await PDFDocument.create()


const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
const page = pdfDoc.addPage()
const { width, height } = page.getSize()
const fontSize = 30
page.drawText(`This pdf shows that the child by the name:${foundVaccineDetails.userName} has been vaccinated of ${foundVaccineDetails.name} on Date:${foundVaccineDetails.date} by ${foundVaccineDetails.docName}`, {
  x: width,
  y: height - 4 * fontSize,
  size: fontSize,
  font: timesRomanFont,
  color: rgb(0, 0.53, 0.71),
})
const pdfBytes = await pdfDoc.save()
transporter.sendMail({
    from: 'kedard249.kd@gmail.com',
    to: `${FoundUser.email}`,
    subject: 'An Attached File',
    text: `Hi ${FoundUser.parentName1}
    PFA your childs vaccination certificate for ${foundVaccineDetails.name}
    `,
    attachments: [{
      filename: 'file.pdf',
      path: 'C:/Users/Username/Desktop/somefile.pdf',
      contentType: 'application/pdf'
    }],
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

}
