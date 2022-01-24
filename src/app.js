const express = require("express");
const path = require("path");
const app = express();
const multer = require('multer')
//  const uploadva = multer({ dest: './merbackend/uploads' })
const hbs = require("hbs")
var bcrypt = require('bcryptjs');
// const axios = require("axios")


require("./db/conn");
const Login = require("./models/Login");
const Employees = require("./models/emp");
const Payments = require("./models/paydet");
const Registers = require("./models/regis");
const Projects = require("./models/prodet");
const Totals = require("./models/total");
const Forgots = require("./models/forgot");
const { resolveObjectURL } = require("buffer");


const port = process.env.PORT || 8000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
const uploads_path = path.join(__dirname, "../templates/uploads");
//  path.join(__dirname, "../templates/uploads");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(uploads_path));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
//  app.set("uploads", uploadva);
hbs.registerPartials(partials_path);

// const Storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         let ext = path.extname(file.originalname)
//         cb(null, Date.now() + ext)
//     }
// });

//multer storage ke liye 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../templates/uploads"))
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + "_" + file.originalname)
    }
})
// Math.round(Math.random() * 1E9
var upload = multer({ storage: storage }).single('Compliance');


//home page route 
app.get("/home", (req, res) => {
    res.render("home")
})

//client side route ke liye
app.get("/client", (req, res) => {
    res.render("client")
})

app.get("/projectlist", (req, res) => {
    res.render("projectlist")
})
//entry 
app.get("/entry", (req, res) => {
    res.render("entry")
})

//Login
app.get("/Login", (req, res) => {
    res.render("Login")
});

app.post("/Login", async (req, res) => {
    try {
        // const tr = req.body.Password
        // const registerEmployee = new Login({
        EmpID = req.body.EmpID;
        Password = req.body.Password;
        console.log(req.body);
        if (!EmpID || !Password) {
            res.status(400).json({ error: "plz fill the data" })
        }
        const user = await Registers.findOne({ EmpID: EmpID });
        console.log(user);
        // if (user.EmpID === EmpID&&user.Password===Password ) {
        //     res.status(201).render("entry");
        // } else {
        //     alert("it is invalid")///ye wala chaoye reh skta heyyy
        // }

        // })

        if (user) {
            const isma = await bcrypt.compare(Password, user.Password)
            console.log(isma)

            if (!isma) {
                res.status(400).json({ err: "Invalid Credentials" })
            } else {
                res.status(201).redirect("entry")
            }
        } else {
            res.status(401).json({ error: "User does not exist" })
        }





    } catch (error) {
        res.status(400).send(error)
    }
});

//register ke liye
app.get("/regis", (req, res) => {
    res.render("regis")
});

app.post("/regis", async (req, res) => {
    try {
        console.log(req.body);
        const obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj)
        const jan = req.body.Password;
        const ban = req.body.CPassword;
        const danda = req.body.Name

        if (jan === ban) {
            const BhuEmployees = new Registers({
                EmpID: req.body.EmpID,
                // Name: req.body.Name,
                // Name:danda,
                Name: danda,
                Password: jan,
                CPassword: ban,
            })

            const token = await BhuEmployees.generateAuthToken();
            const registered = await BhuEmployees.save();
            res.status(201).redirect("Login")
        } else {
            res.send("inval")
        }

    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
});

app.get("/emp", (req, res) => {
    res.render("emp")
});

//employee

app.post("/emp", async (req, res) => {
    try {
        console.log(req.body);
        const obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj)
        const Employee = new Employees({
            EmpID: req.body.EmpID,

            Name: req.body.Name,
            Joining: req.body.Joining,
            Grade: req.body.Grade,
            Skill: req.body.Skill,

            //  mont: req.body.mont,
            mytext: req.body.mytext
        })

        const Emped = await Employee.save();
        console.log(Emped);
        // res.status(201).send("paydet");
        res.status(201).render("entry")



    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
});


//Project wala database asynchronous
// app.get("/prodet", (req, res) => {
//     res.render("prodet")
// });

app.post("/prodet", async (req, res) => {
    try {
        console.log(req.body);
        const Project = new Projects({
            Pstart: req.body.Pstart,

            Estart: req.body.Estart,
            Ponum: req.body.Ponum,
            Podate: req.body.Podate,
            Sow: req.body.Sow,
            Poterms: req.body.Poterms,
            Compliance: req.body.Compliance,
            Paycycle: req.body.Paycycle,
            Rate: req.body.Rate,
            EmpID: req.body.EmpID,
            Duration: req.body.Duration,
            Projects: req.body.Projects,
        })

        const Proed = await Project.save();
        console.log(Proed);

        res.status(201).render("entry")

    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
});







// Step 8 - the POST handler for processing the uploaded file

// app.post("/paydet/:EmpID", upload.single('Compliance'), async (req, res) => {
app.post("/paydet/:EmpID", upload, async (req, res) => {
    try {
        console.log(req.body);

        const obj = JSON.parse(JSON.stringify(req.body));
        console.log(obj)
        const Payment = new Payments({
            ProDura: req.body.ProDura,
            PoDe: req.body.PoDe,
            // Compliance: {
            //     data: req.file.filename,
            //     contentType: 'image/png/pdf/excel'
            // },
            Compliance: req.file.filename,
            choose: req.body.choose,
            RateCli: req.body.RateCli,
            ProSel: req.body.ProSel,
            BiDa: req.body.BiDa,
            BiCy: req.body.BiCy,
            PyCy: req.body.PyCy,
            PySt: req.body.PySt,
        })

        const Payed = await Payment.save();
        console.log(Payed);

        res.status(201).send("entry")

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
        console.log(error);
    }
});


app.get("/details", (req, res) => {
    res.render('details')
})

// app.get('/details', (req, res) => {
//     // console.log(req.params.EmpID);
//     // db.knowledgebase.find({ "applicationId": "2955f3e174dce55190a87ed0e133adwdeb92"}, { "name": 1,    "content": 1});
//     // Projects.findByEmpID(req.params.EmpID)
//     // Projects.find({"EmpID":req.params.EmpID},{"Paycycle":1,"Ponum":1});
//     // db.students.find({{ "roll": {$gt: 70}},{"name": 1,"roll":1,"_id": False})
//     // db.collection_name.find({email:'you@email.com'},{name:true,email:true,phone:true});
//     // Projects.find({EmpID:req.params.EmpID},{Ponum:true,Podate:true});

// app.get("/details/:EmpID", (req, res,next) => {
//     console.log(req.params.EmpID)

//     Projects.find({ EmpID: req.params.EmpID }, { Ponum: true, Podate: true })
//         //     if (!err) {
//         //         res.render('details', {

//         //             doc: docs
//         //         });
//         //     }
//         //     else {
//         //         console.log("errroe uuu" + err)
//         //     }
//         // }
//         .then(result => {
//             res.render('details',({
//                 doc: result
//             }))
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })


// });
app.get('/paydet', (req, res) => {
    res.render('paydet')
})


app.get("/paydet/:EmpID", (req, res, next) => {
    // app.get("/lake/:EmpID", (req, res, next) => {
    // console.log(req.params.EmpID)
    console.log(req.params.EmpID)


    Projects.find({ EmpID: req.params.EmpID }, { Ponum: true, Podate: true, Duration: true, Projects: true })

        //     if (!err) {
        //         res.render('details', {

        //             doc: docs
        //         });
        //     }
        //     else {
        //         console.log("errroe uuu" + err)
        //     }
        // }
        .then(result => {
            res.render('paydet', ({
                doc: result
            }))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })


});//y wala krna het humkooo

app.get('/kopa', (req, res) => {
    Payments.find({}, { Compliance: true, })
        .then(result => {
            res.render('kopa', ({
                joc: result
            }))
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })


})






app.get("/list", (req, res, next) => {
    Totals.find((err, docs) => {
        if (!err) {
            res.render("list", {
                kl: docs
            })
            console.log(docs);
        }
        else {
            console.log("errrror retrive" + err);
        }
    })



});



app.get('/total', (req, res) => {
    res.render('total')
})


app.post("/total", async (req, res) => {
    try {
        console.log(req.body);
        const Pro = new Totals({
            total: req.body.total,



        })

        const Prop = await Pro.save();
        console.log(Prop);

        res.status(201).render("entry")

    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
});
// app.get('/list',(req,res)=>{
//     res.render('list')
// })

app.get('/prodet', (req, res) => {
    Totals.find((err, docs) => {
        if (!err) {
            res.render("prodet", {
                kl: docs
            })
            console.log(docs);
        }
        else {
            console.log("errrror retrive" + err);
        }
    })



})
// router.get("/total", async (req, res, next) => {
//     console.log("'/test' call");
//     try {
//       const res = await axios.get("http://localhost:8000/total");
//       res.json(data);
//     }
//     catch (err) {
//       next(err)
//     }
//   })


// app.get("/total", (req, res, next) => {
//     // console.log("'/test' call");
//     axios.get("http://localhost:8000/total")
//         .then(data => res.json(data))
//     console.log(data)

//         // .then(data => {
//         //     res.render('paydet', ({
//         //         doc: data
//         //     }))
//         .catch(err => next(err));
// })

// app.get("/total", async (req, res, next) => {

//     const rest= await axios.get('localhost:8000/total', {
//         headers: {
//             Accept: 'accept',
//             Authorization: 'authorize'
//         },
//     }).then(response => {
//         res.render('total',({
//             john:response
//         }))

//     }).catch(err => {
//         console.log(err);
//     });
//     })
//     axios.get('http://localhost:8000/total')
//         .then(response => {
//             res.render('total', ({
//                 john: response
//             }))

//                 .catch((e) => {
//                     console.log(e);
//                 });
//         });
// });

// app.get("/total", async (req, res, next) => {
//     try {
//         const URL =' http://localhost:8000/total' 
//         axios.get(URL)
//         .then((res)=>{
//             console.log(res);
//         })


//     }catch(e){
//         console.log(e);

//     }
// });


// app.get('/lake', (req, res) => {
//     res.render('lake')
// })


// app.put("/:id", async (req, res) => {
//     const dobli = req.body.pas;
//     const jobli = req.body.confirm;

//     if (dobli === jobli) {
//        const _id=req.params.id





//     }






// })




// function updateRecord(req, res) {
//     const dobli = req.body.pas;
//     const jobli = req.body.confirm;

//     if (dobli === jobli) {


//       Registers.findOneAndUpdate(
//             { EmpID: 'int899' },
//             {
//               $set: {
//                 Password:dobli ,

//               }
//             },
//             {
//               upsert: true
//             }
//           )

//           .then(result => {
//             console.log(result)
//            })
//           .catch(error => console.error(error))

//     }



// }



// app.get("/forgot", async (req, res) => {

//     const doba = req.body.id
//     const filter = { EmpID: doba };
//     const update = { Password: req.body.pas }
//     const jola = await Registers.findOneAndUpdate(filter, update, {
//         new: true
//     });


// })


// app.get("/forgot/:EmpID",async(req,res)=>{
//     const condition={EmpID:req.params.EmpID};
//     const bra={Password:req.body.pas};


//     Registers.updateOne(condition,bra)
//     .then(doc=>{
//         if(!doc){
//             return res.status(400).end();
//         }
//         return res.status(200).json(doc)

//     })
//     .catch(err=>next(err));
// })
app.get("/forgot", (req, res) => {
    res.render("forgot")
})

// app.post("/forgot/:EmpID", async (req, res) => {
app.post("/forgot", async (req, res) => {
    // const filter = { EmpID: req.params.EmpID};

    req.body.Password = await bcrypt.hash(req.body.Password, 8);
    const filter = { EmpID: req.body.EmpID }
    const update = { Password: req.body.Password };






    let doc = await Registers.findOneAndUpdate(filter, update, {
        new: true,

    })


        .then(doc => {
            console.log(doc)
            if (!doc) {
                return res.status(400).end();
            }
            // return res.status(200).json(doc);
            return res.status(200).redirect("Login");

        })

        .catch(err => next(err))
});


























app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})
