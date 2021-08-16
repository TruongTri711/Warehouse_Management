var Product = require('../models/product.model');
var Supplier = require('../models/supplier.model');
var Unit = require('../models/unit.model');
var ExportCoupon = require('../models/exportCoupon.model');
var ExportHistory = require('../models/exportHistory.model');
var Revenue = require('../models/revenue.model');

var ObjectId = require('mongodb').ObjectId;

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
    var product = await Product.find();
    var revenue = await Revenue.find();
    var unit = await Unit.distinct('name');
    res.render('export/insertExport', {
        product: product,
        revenue: revenue,
        unit: unit
    });
}

module.exports.postInsertExport = async function(req, res){
    var ID = req.body.ID;
    var nameCoupon = req.body.name;
    var reasonCoupon = req.body.reason;
    var noteCoupon = req.body.note;
    var date = req.body.date;

    // id: là tên vật tư
    var listproduct = req.params.id;

    // numberExport: là tổng số lượng hàng đã xuất
    var numberExport = parseInt(req.params.numberExport);

    // numberExport: là tổng số lượng hàng đã xuất
    var priceExport = parseInt(req.params.priceExport);

    // allProfit: là tổng số chi phí lợi nhuận
    var allProfit = parseInt(req.params.allProfit);

    

    var listUnit = req.body.listUnit;
    var price = parseInt(req.body.price);

    // id1: số lượng sản phẩm còn lại trong kho
    var id = parseInt(req.params.id1);

    var number = parseInt(req.body.number);

    //id2: là giá hiện tại của vật tư
    var id2 = parseInt(req.params.id2);
    // profit_old: là số tiền mà giá hiện tại nhân với số lượng
    var profit_old = id2 * number;


    var sum = id - number;
    var total = price * number;
    var profit = total - profit_old;

    // cộng tổng số lượng xuất
    var sumNumberExport = numberExport + number;
    var sumPriceExport = priceExport + total;
    var sumAllProfit = allProfit + profit;

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
        "unit": listUnit,
        "price": price,
        "number": number,
        "total": total,
        "profit": profit,
        "date": date
    })

    await Product.updateOne({name: listproduct}, {$set:{number: sum}});
    await Revenue.updateOne({name: listproduct}, {$set: {number_export: sumNumberExport, price_export: sumPriceExport, profit: sumAllProfit}});
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

module.exports.report = async function(req, res){
    var coupon = await ExportCoupon.find({ID: req.params.id});
    var history = await ExportHistory.find({ID: req.params.id});
    var total = await ExportHistory.aggregate([
        {$match: {ID: req.params.id}},
        {$group: {_id: null, sum: {$sum: '$total'}}}
    ])
    res.render('export/report', {
        coupon: coupon,
        history: history,
        total: total
    })
}