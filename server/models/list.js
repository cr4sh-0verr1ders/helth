var mongoose = require("mongoose")
var Schema = mongoose.Schema;

// the list table has arrays of prescription references that are awaiting review
// joiend to doctor's account 
var schema = new Schema({
    owner: Schema.ObjectId, // reference to id of doctor  
    array: [Schema.ObjectId], // array of references to prescriptions 
});

// Compile Model 
var list_model = mongoose.model("list_model", schema);
module.exports = list_model; 
