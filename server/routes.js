const express = require("express")
const router = express.Router()
const passport = require("passport");
const User = require("./models/users"); 

// prescription schema
const prescriptions_model = require("./models/prescriptions");
// list schema
const list_model = require("./models/list"); 

/* Middleware */
// Note - Don't call next on middleware that modifies the response body
// Log every endpoint call
router.use(function logCall(req, res, next){
    // placeholder log to STDOUT 
    console.log(`Endpoint: ${req.baseUrl}${req.url}`);
    console.log("Req Body: %j", req.body);
    next(); 
}); 

/* Endpoint Functions
 * Async IO 
 */ 

// Test Endpoint
function test(req, res){
    res.status(200); 
    // Echo back post body
    res.json(req.body);
}

// Login
async function login(req, res, next){
   passport.authenticate("local", function(err, user, info) {
        if (err) {
            return res.status(400).json({ errors: err });
        }
        if (!user) {
            return res.status(400).json({ errors: "No user found" });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(400).json({ errors: err });
            }
            return res.status(200).json({ success: `logged in ${user.id}` });
        });
    })(req, res, next);
}

// Register
async function register(req, res, next){
    if(req.body.email && req.body.username && req.body.password) {
        const userData = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        User.create(userData, function (err, user) {
            if (err) {
              return next(err)
            } else {
              return res.redirect('/profile');
            }
          });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
}

// In reality, prescriptions should be moved to a separate archive db along with some other policy compliant actions. 
// Implementation wise, they are dropped once resolved. 


// Query Prescription
async function queryPres(req, res){
    // Passport Check Authentication 
    // TODO 
    // Check if authorised to query, i.e. check user type 
    
    // Will return 
    // 1. List of prescription requests that the doctor is "scheduled" to review 
    
    // Validate passport authentication 
    
    // Query all 
    var query = list_model.find({"owner":});
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
    // Check Authentication
    res.status(200); 
    res.send("lorem");
}

/* Routes (Endpoints - Check Docs) */
router.post("/test", test);
router.post("/queryPres", queryPres); 
router.post("/createPres", createPres); 
router.post("/viewPres", viewPres); 
router.post("/fufillPres", fufillPres);

// Authentication Routes
router.post("/login", login);
router.post("/register", register); 

module.exports = router;
