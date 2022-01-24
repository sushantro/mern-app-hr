const mongoose = require("mongoose");

const empSchema = new mongoose.Schema({
    EmpID : {
        type:String,
        required:true,
        unique:true
    },
    Name: {
        type:String,
        required:true,
    },
    Joining: {
        type:Date,
        required:true,
    },
    Grade: {
        type:String,
        required:true,
    },
    Skill: {
        type:Array,
        required:true,
    },
    // mont: {
    //     type:Number,
    //     required:true
    // },
    //annual ctc
    mytext: {
        type:Array,
        required:true
    }
    

})


const Employees = new mongoose.model("Employee", empSchema);

module.exports = Employees;