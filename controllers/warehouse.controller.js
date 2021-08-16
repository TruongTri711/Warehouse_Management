var Product = require('../models/product.model');
var Supplier = require('../models/supplier.model');
var Unit = require('../models/unit.model');
var ImportHistory = require('../models/importHistory.model')
var ImportCoupon = require('../models/importCoupon.model')
var Revenue = require('../models/revenue.model')

var ObjectId = require('mongodb').ObjectId;

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
    var product = await Product.find();
    var supplier = await Supplier.distinct('name');
    var unit = await Unit.distinct('name');
    var revenue = await Revenue.find();
    res.render('warehouse/insertCoupon', {
        product: product,
        supplier: supplier,
        unit: unit,
        revenue: revenue
    });
}

module.exports.postInsertCoupon = async function(req, res){
    var ID = req.body.ID;
    var nameCoupon = req.body.name;
    var reasonCoupon = req.body.reason;
    var noteCoupon = req.body.note;
    var date = req.body.date;

    // lấy ra tên products
    //var listproduct = req.body.listproduct; // nó lấy ra cái value: không đúng
    var listproduct = req.params.id;


    var listSupplier = req.body.listSupplier;
    var listUnit = req.body.listUnit;
    var price = parseInt(req.body.price);


    // numberImport: là tổng số lượng nhập kho của sản phẩm đó: bảng revenue
    var numberImport = parseInt(req.params.numberImport);

    // var priceImport: ;à tổng số tiền trả cho những lần nhập kho: bảng revenue
    var priceImport = parseInt(req.params.priceImport);

    //number: là number vừa nhập
    var number = parseInt(req.body.number);
    //id: là number trong kho hàng
    var id = parseInt(req.params.id1);

    //sum: là cộng cũ và mới làm một
    var sum = id + number;

    // cộng tổng số lượng nhập kho
    var sumNumberImport = numberImport + number;

    // tổng tiền khi nhập vật tư đó
    var total = price * number;


    // cộng tổng giá nhập kho
    var sumPriceImport = priceImport + total;


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
        "total": total,
        "date": date
    })

    await Product.updateOne({name: listproduct}, {$set: {price: price, number: sum} });
    await Revenue.updateOne({name: listproduct}, {$set: {number_import: sumNumberImport, price_import: sumPriceImport}});
    res.redirect('/warehouse');
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

module.exports.report = async function(req, res){
    var coupon = await ImportCoupon.find({ID: req.params.id});
    var history = await ImportHistory.find({ID: req.params.id});
    var total = await ImportHistory.aggregate([
        {$match: {ID: req.params.id}},
        {$group: {_id: null, sum: {$sum: '$total'}}}
    ])

    res.render('warehouse/report', {
        coupon: coupon,
        history: history,
        total: total
    })
}