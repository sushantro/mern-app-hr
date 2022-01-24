const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
    ProDura : {
        type:String,
        required:true,
    },
    PoDe: {
        type:Array,
        required:true,
    },
    Compliance: {
        
        // data: Buffer,
        // contentType: String
        type:String,
        required:true,
    },
    RateCli: {
        type:String,
        required:true,
    },
    ProSel: {
        type:String,
        required:false,
    },
    BiDa: {
        type:String,
        required:true,
    },
    BiCy: {
        type:String,
        required:true,
    },
    PyCy: {
        type:String,
        required:true,
    },
    PySt: {
        type:String,
        required:true,
    },
})


const Payments = new mongoose.model("Payments", paySchema);

module.exports = Payments;


