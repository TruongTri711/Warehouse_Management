var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String
})

var User = mongoose.model('User', userSchema, 'user');

module.exports = User