const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
    name: String,
    numEmployees: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Organization', OrganizationSchema);