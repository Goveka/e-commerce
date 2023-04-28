const  mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    adminName: String,
    password: String,
    recoveryPassword: String
});

module.exports= mongoose.model('Admin', adminSchema)