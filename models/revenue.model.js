var mongoose = require('mongoose')

var revenueSchema = new mongoose.Schema({
    name: String,
    unit: String,
    number_import: Number,
    price_import: Number,
    number_export: Number,
    price_export: Number,
    profit: Number
})

var Revenue = new mongoose.model('Revenue', revenueSchema, 'revenue');

module.exports = Revenue;
