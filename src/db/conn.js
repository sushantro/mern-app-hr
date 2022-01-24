const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/login",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`unsuccess`);
})

mongoose.emp = mongoose.createConnection("mongodb://localhost:27017/emp",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongoose.paydet = mongoose.createConnection("mongodb://localhost:27017/paydet",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongoose.prodet = mongoose.createConnection("mongodb://localhost:27017/prodet",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

mongoose.register = mongoose.createConnection("mongodb://localhost:27017/register",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


mongoose.register = mongoose.createConnection("mongodb://localhost:27017/total",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

