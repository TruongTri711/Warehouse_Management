var Product = require('../models/product.model')
var Import_History = require('../models/importHistory.model');
var Export_History = require('../models/exportHistory.model')

module.exports.index = async function(req, res){
    var product = await Product.aggregate([{$group:{_id: null, sum: {$sum: "$number"}}}]);
    var import_history = await Import_History.aggregate([{$match: {}}, {$group: {_id: null, sum: {$sum: "$number"}}} ]);
    var export_history = await Export_History.aggregate([{$match: {}}, {$group: {_id: null, sum: {$sum: "$number"}}} ]);

    res.render('index/index', {
        product: product,
        import_history: import_history,
        export_history: export_history,
    });
}
