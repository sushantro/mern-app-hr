const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")

const loginSchema = new mongoose.Schema({
    EmpID : {
        type:String,
        // required:true,
        // unique:true
    },
    Password : {
        type:String,
        // required:true,
        // unique:true
    }
})
// loginSchema.pre("save", async function (next) {

// const Passwordjash=await bcrypt.hash(this.Password,10)
// this.Password=await bcrypt.compare(this.Password,Passwordjash)
// console.log(this.Password);
// })


const Login = new mongoose.model("Login", loginSchema);

module.exports = Login;


