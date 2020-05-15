 
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var driver = new Schema({
    "password":{ type:String, required:true },
    "first_name": { type:String, required:true },
    "last_name": String,
    "mobile_no":{ type:String, required:true },
    "nic_no":{ type:String, required:true },
    "nearest_eco_center":String,
    "vehicle_color": String,
    "vehicle_type":String,
    "maximam_weight_can_carry":Number,
    "profile_pic":String,
    "vehicle_plate_no":String
}, {
    collection: 'Drivers'
});
var drivers = mongoose.model('drivers', driver);

module.exports = drivers;