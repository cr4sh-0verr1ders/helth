const express = require("express");
const routes = require("./routes") 
const app = express(); 

// parsing post data 
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

