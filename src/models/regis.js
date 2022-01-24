const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const res = require("express/lib/response");
const regisSchema = new mongoose.Schema({
    EmpID: {
        type: String,
        required: true,
        trim: true

    },
    Name: {
        type: String,
        // required:true,
        uppercase: true,
        unique: true,
        trim: true,
        // minlength:[2,"minimum 2 letters should be there"],
        // maxlength:30


    },
    Password: {
        type: String,
        // required:true,
        // unique: true



    },
    CPassword: {
        type: String,
        // required:true,
        // unique: true

    },

    tokens:[{
        token:{
           type:String,
           require:true 
        }


    }]
})
//instance ke sath kam krrha too  methods use krtey hey 
regisSchema.methods. generateAuthToken=async function(){

    try{
        const token=jwt.sign({_id:this._id.toString()},"my name is idbi intechva bhava tu bank nako jau")
        console.log(token);
        this.tokens=this.tokens.concat({token:token})
    }catch(e){
        res.send(`the error is ${e}`)
        console.log(`the error is ${e}`)

    }


}


//pre utilize save hone se pahile generate krtey hashing algorith lagaya hey 10 round ka

regisSchema.pre("save", async function (next) {
    if (this.isModified("Password")) {
        // const passwrod = await bcrypt.hash(Password, 10);
        this.Password = await bcrypt.hash(this.Password, 10)
        console.log(`${this.Password }`);
       
        this.CPassword=undefined;
    }
    next()


})
const Registers = new mongoose.model("Registers", regisSchema);

module.exports = Registers;