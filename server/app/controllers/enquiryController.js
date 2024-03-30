const Enquiry = require("../models/enquiryModel");

const enquiryController = {};

enquiryController.list=(req,res)=>{
    Enquiry.find()
    .then((enquiry)=>{
        res.json(enquiry)
    })
    .catch((err)=>{
       res.json(err.message)
    })
}

enquiryController.create=(req,res)=>{
    const body=req.body
    const enquiry=new Enquiry(body)
    enquiry.save()
    .then((enquiry)=>{
        res.json(enquiry)
    })
    .catch((err)=>{
        res.json(err.message)
    })
}

enquiryController.show=(req,res)=>{
    const id=req.params.id
    Enquiry.findById(id)
    .then((enquiry)=>{
        res.json(enquiry)
    })
    .catch((err)=>{
        res.json(err.meassage)
    })
}



module.exports = enquiryController;