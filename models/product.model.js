var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: String,
    unit: String,
    price: Number,
    number: Number,
});

// products là tên bảng
var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
