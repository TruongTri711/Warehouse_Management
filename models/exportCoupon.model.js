var mongoose = require('mongoose')

var exportCouponSchema = new mongoose.Schema({
    ID: String,
    name: String,
    reason: String,
    note: String,
    date: String
})

var ExportCoupon = mongoose.model('ExportCoupon', exportCouponSchema, 'export_coupon');

module.exports = ExportCoupon;