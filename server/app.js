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
const mongoDB = "mongodb://localhost:27017/helth"; 
mongoose.connect(mongoDB, {useNewUrlParser: true}); 

// Get DB Reference
const db = mongoose.connection; 

// Deprecation Changes 
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true); 

// Connection error event 
db.on("error", console.error.bind(console, "MongoDB Error: ")); 
db.once("open", function(){
    console.log(`Connected to MongoDB at ${mongoDB}`);
});
// Initialise Express Session
// Session cookie name is connect.sid 
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
// Passport session middleware will alter the req object to change the user value from id to actual object id which we can grab 
app.use(passport.session());

// Parsing middleware
const bodyParser = require("body-parser"); 

// Let body-parser parse POST body
// Enabled json + urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Prepend API to all routes
app.use("/API", routes); 

// ObjectID Type
const ObjectId = mongoose.Types.ObjectId; 

/* DUMMY DATA */
//var list_instance = new list_model({
//    owner: new ObjectId("5ee3879954fc915b657a5422"), 
//    array: [ObjectId("5ee39d185d51b95fac9fb094")], 
//});

//var pres_instance = new prescriptions_model({
//    patient_ihi: "1234567890123456", 
//    patient_givenname: "Andrew",
//    patient_surname: "Yu", 
//    patient_dob: new Date(), 
//    patient_sex: true, 
//    patient_addr1: "Space", 
//    patient_phone: "0410566797", 
//    patient_email: "andrew.yu6@hotmail.com",
//    patient_dva: "", 
//    patient_medicare: "",
//    patient_medicare_irn: "",
//    doc_hpi: "HPI", 
//    doc_auth_ref: "Yes",
//    doc_name: "John Citizen",
//    doc_address: "1 Doc Street", 
//    doc_phone: "0410988353", 
//    doc_qualification: "lorem", 
//    meds_name: "NalGeen", 
//    meds_quantity: 40, 
//    meds_usage: "Oral", 
//    meds_reason: "Face skin irritation", 
//    meds_repeats: 4, 
//    meds_interval: 5,
//    approved: false,
//});

//pres_instance.save(function(err) {
//    if(err){
//        console.log(err);
//    } else {
//        console.log(`Dummy record created for ${pres_instance.patient_givenname}`); 
//    }
//    
//    
//});

//list_instance.save(function(err){
//    if(err){
//        console.log(err);
//    } else {
//        console.log(`Dummy list record created`);
//    }
//    
//});

const port = 8080; 
const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
}); 

