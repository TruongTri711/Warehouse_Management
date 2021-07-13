var Product = require('../models/product.model');
var Supplier = require('../models/supplier.model');
var Unit = require('../models/unit.model');
var ImportHistory = require('../models/importHistory.model')
var ImportCoupon = require('../models/importCoupon.model')

module.exports.warehouse = async function(req, res){
    var coupon = await ImportCoupon.find();
    res.render('warehouse/index', {
        coupon: coupon
    });
}

module.exports.deleteCoupon = async function(req, res){
    await ImportCoupon.deleteOne({_id: req.params.id});
    res.redirect('back');
}

module.exports.postSearch = async function(req, res){
    var search = req.body.search;
    var find = await ImportCoupon.find( { $text: { $search: search } } );
    res.render('warehouse/index', {
        find: find,
        values: search,
    })
}

module.exports.insertCoupon = async function(req, res){
    var product = await Product.distinct("name");
    var supplier = await Supplier.distinct('name');
    var unit = await Unit.distinct('name');
    res.render('warehouse/insertCoupon', {
        product: product,
        supplier: supplier,
        unit: unit
    });
}

module.exports.postInsertCoupon = async function(req, res){
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

    await ImportCoupon.insertMany({
        "ID": ID,
        "name": nameCoupon,
        "reason": reasonCoupon,
        "note": noteCoupon,
        "date": date
    })

    await ImportHistory.insertMany({
        "ID": ID,
        "name": listproduct,
        "supplier": listSupplier,
        "unit": listUnit,
        "price": price,
        "number": number,
        "total": total
    })
    res.redirect('/warehouse')
}

module.exports.updateCoupon = async function(req, res){
    var view = await ImportCoupon.find({"_id": req.params.id});
    res.render('warehouse/updateCoupon', {
        view: view
    })
}

module.exports.putUpdateCoupon = async function(req, res){
    await ImportCoupon.updateOne({_id: req.params.id}, req.body);
    res.redirect('/warehouse');
}

module.exports.importHistory = async function(req, res){
    var view = await ImportHistory.find();
    res.render('warehouse/importHistory', {
        view: view
    })
}

module.exports.deleteImportHistory = async function(req, res){
    await ImportHistory.deleteOne({_id: req.params.id});
    res.redirect('back');
}

module.exports.postSearchHistory = async function(req, res){
    var search = req.body.search;
    var find = await ImportHistory.find( { $text: { $search: search } } );
    res.render('warehouse/importHistory', {
        find: find,
        values: search,
    })
}

module.exports.viewCoupon = async function(req, res){
    var coupon = await ImportCoupon.find({ID: req.params.id});
    var history = await ImportHistory.find({ID: req.params.id});
    var total = await ImportHistory.aggregate([  
        {$match: {ID: req.params.id}}, 
        {$group: {_id: null, sum: {$sum: "$total"}}}  
    ])
    res.render('warehouse/viewCoupon', {
        coupon: coupon,
        history: history,
        total: total
    })
}