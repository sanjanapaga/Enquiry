const mongoose=require('mongoose')

const enquirySchema= new mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    briefRequirement:{
        type:String,
        required:true
    },
    contactNumber: {
        type:String,
        required:true
    },
    date:{
        type:String,
        Required:true
    }
}
)

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry

