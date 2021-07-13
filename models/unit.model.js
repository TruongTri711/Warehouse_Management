var mongoose = require('mongoose')

var unitSchema = mongoose.Schema({
    codeName: String,
    name: String
})

var Unit = mongoose.model('Unit', unitSchema, 'unit')

module.exports = Unit