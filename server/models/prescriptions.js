var mongoose = require("mongoose")
var Schema = mongoose.Schema;

// waiting on db schema 
var schema = new Schema({
    patientName: {
        type: String
    },
    doctorsName: {
        type:String
    },
    address: {
        type: String
    },
    prescribedDate: {
        type: Date
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

});

module.exports = mongoose.model("prescriptions", schema);
