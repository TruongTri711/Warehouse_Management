var mongoose = require('mongoose')

var importCouponSchema = new mongoose.Schema({
    ID: String,
    name: String,
    reason: String,
    note: String,
    date: String
})

var ImportCoupon = mongoose.model('ImportCoupon', importCouponSchema, 'import_coupon');

module.exports = ImportCoupon;