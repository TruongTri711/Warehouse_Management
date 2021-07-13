var Product = require('../models/product.model')

module.exports.index = async function(req, res){
    var product = await Product.aggregate([{$group:{_id: null, sum: {$sum: "$number"}}}])

    res.render('index/index', {
        product: product,
    });
}