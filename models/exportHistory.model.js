var mongoose = require('mongoose');

var exportHistorySchema = new mongoose.Schema({
    ID: String,
    name: String,
    unit: String,
    price: Number,
    number: Number ,
    total: Number,
    profit: Number,
    date: String
})

var ExportHistory = mongoose.model('ExportHistory', exportHistorySchema, 'export_history');

module.exports = ExportHistory;