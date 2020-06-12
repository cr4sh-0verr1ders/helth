const express = require("express")
const router = express.Router()
const passport = require("passport");
const User = require("./models/users"); 

// Note: If we were doing this proper proper, it would be smarter to use mongoose's populate, which is similar
// to a join table in relation dbs 

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
    console.log("Req Cookies: %j", req.headers.cookie);
    next(); 
}); 

/* Endpoint Functions
 * Async IO 
 */ 

// grab user object id with req.user._id 
// Test Endpoint
function test(req, res){
    res.status(200); 
    // Echo back current user if exists
    res.json(req.user);
}

// Login
async function login(req, res, next){

    console.log("login route");
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
        User.findOne({email: req.body.email})
        .exec(function(err, user) {
            if (err) {
                return next(err);
            } else if (!user) {
                const userData = new User({
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                })
                User.create(userData, function (err, user) {
                    if (err) {
                      return next(err)
                    } else {
                        console.log("It worked!!");
                        return res.status(200).json({ success: `registered ${user.id}` });
                    }
                  });
            } else {
                return res.status(401).json({errors: "User already exists"});
            }
        })
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
    // Will return 
    // 1. List of prescription requests that the doctor is "scheduled" to review 
    // (or prescriptions belonging to user)
    // {"array":["someobjectid","anotherobjectid",<...>]}
    // Validate passport authentication 
     
    // Query all; have to specifically exclude object id  
    var query = list_model.find({"owner": req.user._id},{"_id":0});
    query.select('array'); 
    query.limit(1); 
    query.exec(function(err, array){
        if(err) {
            res.status(500); 
            res.end("Query error"); 
            return;
        }
        console.log(array[0]); 
        res.status(200);
        res.json(array[0]);
    });
}

// Create Prescription 
async function createPres(req, res){
    // Expects post parameters corresponding to prescription schema 
    // Validation
    // TODO
    console.log(req.body);
    var pres_instance = new prescriptions_model({
        patient_ihi: req.body.patient_ihi,
        patient_givenname: req.body.patient_givenname, 
        patient_surname: req.body.patient_surname,
        patient_dob: req.body.patient_dob, // date automatically cased, e.g. 2002-12-09  
        patient_sex: req.body.patient_sex, 
        patient_addr1: req.body.patient_addr1, 
        patient_phone: req.body.patient_phone, 
        patient_email: req.body.patient_email, 
        patient_dva: req.body.patient_dva, 
        patient_medicare: req.body.patient_medicare, 
        patient_medicare_irn: req.body.patient_medicare_irn, 
        doc_hpi: req.body.doc_hpi,
        doc_auth_ref: req.body.doc_auth_ref, 
        doc_name: req.body.doc_name,
        doc_address: req.body.doc_address,
        doc_phone: req.body.doc_phone,
        doc_qualification: req.body.doc_qualification,
        meds_name: req.body.meds_name, 
        meds_quantity: req.body.meds_quantity, // same auto casting with numbers 
        meds_usage: req.body.meds_usage,
        meds_reason: req.body.meds_reason,
        meds_repeats: req.body.meds_repeats, 
        meds_interval: req.body.meds_interval, 
        approved: false, 
    }); 
    
    pres_instance.save(function(err, pres) {
        if(err){
            console.log(err);
            res.status(500);
            res.end(`Failed to push prescription to database: ${err}`);
            return;
        } else {
            // We now want to populate the prescriptions list of the current user
            // As well as the prescriptions list of the doctor who is to approve it 
            
            var query = list_model.find({"owner": req.user._id});
            query.select('array'); 
            query.limit(1); 
            query.exec(function(err, array){
                if(err) {
                    res.status(500); 
                    res.end(`Failed to check list record: ${err}`);  
                    return;
                } 
                // could use upsert to create if doesn't exist?
                if(array.length > 0){ // does a list record for this object id already exist? 
                    list_model.findByIdAndUpdate(
                        array[0]._id,
                        {$push: {"array": pres._id}},
                        {safe: true, new: true},
                        function(err, list){
                            res.status(500);
                            res.end(`Failed to update existing list record: ${err}`);
                            return;
                        }
                    );
                } else {
                    // create new list record
                    var list_instance = new list_model({
                        owner: req.user._id,
                        array: [pres._id]
                    });
                    list_instance.save(function(err){
                        if(err){
                            res.status(500);
                            res.end(`Failed to populate list record: ${err}`);
                            return; 
                        } 
                
                    });
                }
            });
            
            
            res.status(200);
            res.end(); 
        }
    });
}

// View Prescription
async function viewPres(req, res){
    // Expects an ObjectID param 
    if(req.body.presID){
        var query = prescriptions_model.find({"_id": req.body.presID});
        query.limit(1); 
        query.exec(function(err, prescription){
            if(err) {
                res.status(500); 
                res.end(`Query error ${err}`);
                return;
            }
            if(prescription.length > 0){

                console.log(prescription[0]); 
                res.status(200);
                res.json(prescription[0]);
            } else {
                res.status(500);
                res.end("Prescription does not exist");
                return;
            }
                
        });
    } else {
        res.status(400);
        res.end("Missing presID parameter"); 
        return;
    }
}

// Fufill Prescription 
async function fulfilPres(req, res){
    // Check Authorization
    // TODO
    // Expects an ObjectID param 
    if(req.body.presID){
        var query = prescriptions_model.find({"_id": req.body.presID});
        query.limit(1); 
        query.exec(function(err, prescription){
            if(err) {
                res.status(500); 
                res.end(`Query error ${err}`);
                return
            }
            
            // check if we have something to modify
            if(prescription.length > 0){
                // check that the prescription is approved 
                if(prescription[0].approved){    
                    // by """fulfilling""" the prescription, we should be archiving the e-prescription and 
                    // moving it to a PDS. here we just drop it, since hackathon
                    
                    prescriptions_model.deleteOne({_id: prescription[0]._id}, function(err,res){
                        if(err){
                            res.status(500);
                            res.end("Failed to delete prescriptions record");
                        }
                    }); 
                   
                    // we also need to remove referencess in the list collection
                    var q = list_model.find({array: prescription[0]._id}); 
                    q.exec(function(err, list){
                        if(err){
                            res.status(500);
                            res.end(`Query error ${err}`);
                            return;
                        }
                        //list_model.deleteMany({array: prescription[0]._id}); // id in array shorthand
                    
                        list_model.updateMany(
                            {array: prescription[0]._id},
                            {$pull: {"array": prescription[0]._id}},
                            {safe: true, new: true},
                            function(err, list){
                                res.status(500);
                                res.end(`Failed to remove id from existing list record: ${err}`);
                                return;
                            }
                        );
                    });

                    
                    res.status(200);
                    res.end();
                    return;  
                
                } else {
                    res.status(400);
                    res.end("Cannot fulfil an unapproved prescription"); 
                    return;
                }
                
            } else {
                res.status(500);
                res.end("Prescription does not exist");
            }
        });
    } else {
        res.status(400);
        res.end("Missing presID parameter"); 
        return;
    }
}

// Approve Prescription 
async function approvePres(req, res){

    // Check Authorization
    // TODO
    // Expects an ObjectID param 
    if(req.body.presID){
        var query = prescriptions_model.find({"_id": req.body.presID});
        query.limit(1); 
        query.exec(async function(err, prescription){
            if(err) {
                res.status(500); 
                res.end(`Query error ${err}`);
                return
            }
            
            // check if we have something to modify
            if(prescription.length > 0){
                prescriptions_model.findOneAndUpdate({_id: prescription[0]._id}, {approved: true}, {new: true}, function(err,doc){
                    if(err){
                        res.status(500); 
                        res.end(`Error approving prescription: ${err}`);
                    }
                    res.status(200);
                    res.end();
                    return; 
                });
            } else {
                res.status(500);
                res.end("Prescription does not exist");
            }
        });
    } else {
        res.status(400);
        res.end("Missing presID parameter"); 
        return;
    }
}
/* Routes (Endpoints - Check Docs) */
router.post("/test", test);
router.get("/test", test); 
router.get("/queryPres", queryPres); 
router.post("/createPres", createPres); 
router.post("/viewPres", viewPres); 
router.post("/fulfilPres", fulfilPres);
router.post("/approvePres", approvePres); 

// Authentication Routes
router.post("/login", login);
router.post("/register", register); 

module.exports = router;
