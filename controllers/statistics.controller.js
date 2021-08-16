var Import_History = require('../models/importHistory.model');
var Export_History = require('../models/exportHistory.model');
var Revenue = require('../models/revenue.model');

// var ObjectId = require('mongodb').ObjectId;

module.exports.index = async function(req, res){
    var product = await Revenue.find();
    res.render('statistics/index', {
        product: product,
    });
}

module.exports.postSearchIndex = async function(req, res){
    var search = req.body.search;
    var find = await Import_History.find({$text: {$search: search}});
    res.render('statistics/index', {
        find: find,
        values: search,
    })
}

module.exports.viewReport = async function(req, res){
    var name = req.params.id;
    // var id = req.params.id1;
    // var o_id = new ObjectId(id);
    //var nameProduct = await Import_History.find({_id: o_id});
    var sumNumberImport = await Import_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$number'}}}]);
    var sumTotalImport = await Import_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$total'}}}]);
    var sumNumberExport = await Export_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$number'}}}]);
    var sumTotalExport = await Export_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: "$total"}}}]);
    var profit = await Export_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$profit'}}}]);
    var find_import = await Import_History.find({name: name});
    var find_export = await Export_History.find({name: name});
    res.render('statistics/viewReport', {
        nameProduct: name,
        sumNumberImport: sumNumberImport,
        sumTotalImport: sumTotalImport,
        sumNumberExport: sumNumberExport,
        sumTotalExport: sumTotalExport,
        profit: profit,
        find_import: find_import,
        find_export: find_export
    })
}

module.exports.report = async function(req, res){
    var name = req.params.id;
    // var id = req.params.id1;
    // var o_id = new ObjectId(id);
    // var nameProduct = await Import_History.find({_id: o_id});
    var sumNumberImport = await Import_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$number'}}}]);
    var sumTotalImport = await Import_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$total'}}}]);
    var sumNumberExport = await Export_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$number'}}}]);
    var sumTotalExport = await Export_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: "$total"}}}]);
    var profit = await Export_History.aggregate([{$match: {name: name}}, {$group: {_id: null, sum: {$sum: '$profit'}}}]);
    var find_import = await Import_History.find({name: name});
    var find_export = await Export_History.find({name: name});
    res.render('statistics/report', {
        nameProduct: name,
        sumNumberImport: sumNumberImport,
        sumTotalImport: sumTotalImport,
        sumNumberExport: sumNumberExport,
        sumTotalExport: sumTotalExport,
        profit: profit,
        find_import: find_import,
        find_export: find_export
    })
}

module.exports.revenue = async function(req, res){
    var revenue = await Revenue.find();
    res.render('statistics/revenue', {
        revenue: revenue
    });
}

module.exports.postRevenue = async function(req, res){
    var search = req.body.search;
    var find = await Revenue.find({$text: {$search: search}});
    res.render('statistics/revenue', {
        find: find
    })
}