const mongoose = require("mongoose");
var bcrypt = require('bcryptjs');


const forgotSchema = new mongoose.Schema({
    Password : {
        type:String,
        // required:true,
        // unique:true
    },
    // confirm : {
    //     type:String,
    //     // required:true,
    //     // unique:true
    // }

    id:{
        type:String,
    },
})



// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(this.Password, salt, function(err, hash) {
//         // Store hash in your password DB.

//     });
// });
// const saltRounds = 10;
// // var password = req.body.Password;
// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(this.Password, salt, function(err, hash) {
//     // returns hash
//     console.log(hash);
//     });
//   });


// forgotSchema.pre("", async function (next) {
    
//         // const passwrod = await bcrypt.hash(Password, 10);
//         this.Password = await bcrypt.hash(this.Password, 10)
//         console.log(`${this.Password }`);
       
//         // this.CPassword=undefined;
    
//     next()


// })


const  Forgots= new mongoose.model("Forgots", forgotSchema);

module.exports = Forgots;
