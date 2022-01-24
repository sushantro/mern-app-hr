const mongoose = require("mongoose");


const totalSchema = new mongoose.Schema({
    total: {
        type:String,
        required:true,
    },

});

const Totals = new mongoose.model("Totals", totalSchema);

module.exports = Totals;