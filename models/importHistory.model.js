var mongoose = require('mongoose');

var importHistorySchema = new mongoose.Schema({
    ID: String,
    name: String,
    supplier: String,
    unit: String,
    price: Number,
    number: Number ,
    total: Number,
    date: String
})

var ImportHistory = mongoose.model('ImportHistory', importHistorySchema, 'import_history');

module.exports = ImportHistory;