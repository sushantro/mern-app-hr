const mongoose = require("mongoose");

const proSchema = new mongoose.Schema({
    Pstart : {
        type:String,
        unique:false,
     
    },
    Estart: {
        type:String,
    
    },
    Ponum: {
        type:Number,
        
    },
    Podate: {
        type:Date,
        
    },
    Sow: {
        type:Array,
        required:false,
    },
    Poterms: {
        type:Array,
        required:true,
    },
    Compliance: {
        type:Array,
        required:true,
    },
    // choose:{
    //     data:Buffer,
    //     contentType: String,
    // },
    Paycycle: {
        type:String,
        required:true,
    },
    Rate: {
        type:String,
        required:true,
    },
    EmpID: {
        type:String,
        unique:false,
        
    },

    Duration:{
        type:String,

    },

    Projects:{
        type:String,

    },
})


const Projects = new mongoose.model("Projects", proSchema);

module.exports = Projects;