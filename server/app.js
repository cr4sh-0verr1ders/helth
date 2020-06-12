const express = require("express");
const routes = require("./routes") 
const mongoose = require("mongoose");
const app = express(); 

// Setup DB 
const mongoDB = "mongodb://localhost/my_db"; 
mongoose.connect(mongoDB, {useNewUrlParser: true}); 
const db = mongoose.connection; 

// Connection error event 
db.on("error", console.error.bind(console, "MongoDB Error: ")); 

// Parsing post data 
const bodyParser = require("body-parser"); 

// Let body-parser parse POST body
// Enabled json + urlencoded
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Prepend API to all routes
app.use("/api", routes); 


const port = 8080; 
const server = app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
}); 

