var Product = require('../models/product.model');
var Supplier = require('../models/supplier.model');
var Unit = require('../models/unit.model');
var ExportCoupon = require('../models/exportCoupon.model');
var ExportHistory = require('../models/exportHistory.model')

module.exports.export = async function(req, res){
    var find = await ExportCoupon.find();
    res.render('export', {
        find: find
    })
}

module.exports.postSearch = async function(req, res){
    var search = req.body.search;
    var find1 = await ExportCoupon.find( { $text: { $search: search } } );
    res.render('export/index', {
        find1: find1,
        values: search,
    })
}

module.exports.updateExport = async function(req, res){
    var view = await ExportCoupon.find({_id: req.params.id})
    res.render('export/updateExport', {
        view: view
    })
}

module.exports.postUpdateExport = async function(req, res){
    await ExportCoupon.updateOne({_id: req.params.id}, req.body)
    res.redirect('/export');
}

module.exports.deleteExport = async function(req, res){
    await ExportCoupon.deleteOne({_id: req.params.id})
    res.redirect('back');
}

module.exports.insertExport = async function(req, res){
    var product = await Product.distinct("name");
    var supplier = await Supplier.distinct('name');
    var unit = await Unit.distinct('name');
    res.render('export/insertExport', {
        product: product,
        supplier: supplier,
        unit: unit
    });
}

module.exports.postInsertExport = async function(req, res){
    var ID = req.body.ID;
    var nameCoupon = req.body.name;
    var reasonCoupon = req.body.reason;
    var noteCoupon = req.body.note;
    var date = req.body.date;
    var listproduct = req.body.listproduct;
    var listSupplier = req.body.listSupplier;
    var listUnit = req.body.listUnit;
    var price = req.body.price;
    var number = req.body.number;
    var total = price * number;

    await ExportCoupon.insertMany({
        "ID": ID,
        "name": nameCoupon,
        "reason": reasonCoupon,
        "note": noteCoupon,
        "date": date
    })

    await ExportHistory.insertMany({
        "ID": ID,
        "name": listproduct,
        "supplier": listSupplier,
        "unit": listUnit,
        "price": price,
        "number": number,
        "total": total
    })
    res.redirect('/export')
}

module.exports.exportHistory = async function(req, res){
    var view = await ExportHistory.find();
    res.render('export/exportHistory', {
        view: view
    })
}

module.exports.deleteExportHistory = async function(req, res){
    await ExportHistory.deleteOne({_id: req.params.id});
    res.redirect('back');
}

module.exports.postSearchHistory = async function(req, res){
    var search = req.body.search;
    var find = await ExportHistory.find( { $text: { $search: search } } );
    res.render('export/exportHistory', {
        find: find,
        values: search,
    })
}

module.exports.viewExport = async function(req, res){
    var coupon = await ExportCoupon.find({ID: req.params.id})
    var history = await ExportHistory.find({ID: req.params.id})
    var total = await ExportHistory.aggregate([  
        {$match: {ID: req.params.id}}, 
        {$group: {_id: null, sum: {$sum: "$total"}}}  
    ])
    res.render('export/viewExport', {
        coupon: coupon,
        history: history,
        total: total
    })
}