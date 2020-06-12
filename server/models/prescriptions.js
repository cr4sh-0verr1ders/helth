var mongoose = require("mongoose")
var Schema = mongoose.Schema;

// If we were doing this proper proper would be smart to look at taking advantage of virtuals, little to no overhead for less space complexity 
//
// can use match regex to do phone number and ihi, va etc validation
var schema = new Schema({
    patient_ihi: String, 
    patient_givenname: {type: String, required: [true, "Given name required."]},
    patient_surname: {type: String, required: [true, "Surname required."]},
    patient_dob: {type: Date, required: [true, "Date of birth required."]},
    patient_sex: {type: Boolean, required: [true, "Medical sex required."]}, // True = male, false = female
    patient_addr1: {type: String, required: [true, "Address required."]},
    patient_phone: {type: String, required: [true, "Phone number required."]},
    patient_email: {type: String, required: [true, "E-Mail required."]}, 
    patient_dva: String, 
    patient_medicare: String,
    patient_medicare_irn: String, 
    doc_hpi: {type: String, required: [true, "Healthcare Provider Identifier-Individual required."]},
    doc_auth_ref: {type: String, required: [true, "Auth ref required."]}, // auth ref? 
    doc_name: {type: String, required: [true, "Doctor's name required."]},
    doc_address: {type: String, required: [true, "Practice address required."]},
    doc_phone: {type: String, required: [true, "Doctor's phone number required."]},
    doc_qualification: {type: String, required: [true, "Doctor's qualification required."]}, 
    meds_name: {type: String, required: [true, "Medication name required."]},
    meds_quantity: {type: Number, required: [true, "Medication quantity required"], min: [1, "Medication quantity must be greater than 0"]},
    meds_usage: {type: String, required: [true, "Medication usage required."]},
    meds_reason: String,
    meds_repeats: {type: Number, required: [true, "Medication repeats required."], min: [0, "Medication repeats must not be negative"]},
    meds_interval: {type: String, required: [true, "Medication interval required."], min: [0, "Medication interval must not be negative"]},
    // in reality, when approved the prescription gets processed and pushed to a PDS for holding 
    // but, hackathon so:
    approved: {type: Boolean, default: false}, 
});

// Compile Model 
var prescriptions_model = mongoose.model("prescriptions_model", schema);
module.exports = prescriptions_model; 
