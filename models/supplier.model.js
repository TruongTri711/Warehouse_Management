var mongoose = require('mongoose');

var supllierSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: Number,
    email: String,
    cooperationDay: String,
})

var Supplier = mongoose.model('Supplier', supllierSchema, 'supplier');

module.exports = Supplier;