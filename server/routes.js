const express = require("express")
const router = express.Router()
const prescriptions_model = require("./models/prescriptions");

/* Middleware */
// Note - Don't call next on middleware that modifies the response body
// Log every endpoint call
router.use(function logCall(req, res, next){
    // placeholder log to STDOUT 
    console.log(`Base URL: ${req.baseUrl}`);
    console.log("Req Body: %j", req.body);
    next(); 
}); 

/* DUMMY DATA */
let electronic_prescriptions = {
    0: {
        patient_ihi: 1234567890123456
    }, 
};

/* Endpoint Functions
 * Async IO 
 */ 

// Test Endpoint
function test(req, res){
    res.status(200); 
    // Echo back post body
    res.json(req.body);
}

// Query Prescription
async function queryPres(req, res){
    // Check Authentication 
    // TODO 


    res.send("lorem");
}

// Create Prescription 
async function createPres(req, res){
    res.status(200); 
    res.send("lorem");
}

// View Prescription
async function viewPres(req, res){
    res.status(200); 
    res.send("lorem");
}

// Fufill Prescription 
async function fufillPres(req, res){
    res.status(200); 
    res.send("lorem");
}

/* Routes (Endpoints - Check Docs) */
router.post("/test", test);
router.post("/queryPres", queryPres); 
router.post("/createPres", createPres); 
router.post("/viewPres", viewPres); 
router.post("/fufillPres", fufillPres); 


module.exports = router;
