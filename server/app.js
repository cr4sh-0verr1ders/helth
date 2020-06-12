const express = require("express");
const routes = require("./routes") 
const mongoose = require("mongoose");
const session = require("express-session"); 
const MongoStore = require("connect-mongo")(session); 
const prescriptions_model = require("./models/prescriptions");
const list_model = require("./models/list");

const passport = require("./passport/setup");
//const auth = require("./routes/auth"); 

const app = express(); 

// Setup DB 
const mongoDB = "mongodb://localhost:27017/my_db"; 
mongoose.connect(mongoDB, {useNewUrlParser: true}); 
const db = mongoose.connection; 

// Connection error event 
db.on("error", console.error.bind(console, "MongoDB Error: ")); 

// Initialise Express Session
app.use(
    session({
        secret: "very secret this is",
        resave: false, // dont force cookie to "save" everytime
        saveUninitialized: true,// save even if does not deviate from default session object
        store: new MongoStore({ mongooseConnection: mongoose.connection }), 
    })
);

/* MIDDLEWARE */

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Parsing middleware
const bodyParser = require("body-parser"); 

// Let body-parser parse POST body
// Enabled json + urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Prepend API to all routes
app.use("/api", routes); 



/* DUMMY DATA */
var pres_instance = new prescriptions_model({
    patient_ihi: "1234567890123456", 
    patient_givenname: "Andrew",
    patient_surname: "Yu", 
    patient_dob: new Date(), 
    patient_sex: true, 
    patient_addr1: "Space", 
    patient_phone: "0410566797", 
    patient_email: "andrew.yu6@hotmail.com",
    patient_dva: "", 
    patient_medicare: "",
    patient_medicare_irn: "",
    doc_hpi: "HPI", 
    doc_auth_ref: "Yes",
    doc_name: "John Citizen",
    doc_address: "1 Doc Street", 
    doc_phone: "0410988353", 
    doc_qualification: "lorem", 
    meds_name: "NalGeen", 
    meds_quantity: 40, 
    meds_usage: "Oral", 
    meds_reason: "Face skin irritation", 
    meds_repeats: 4, 
    meds_interval: 5,
    approved: false,
});

pres_instance.save(function(err) {
    if(err){
        console.log(err);
    } else {
        console.log(`Dummy record created for ${pres_instance.patient_givenname}`); 
    }
    
    
});



const port = 8080; 
const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
}); 

