var Product = require('../../models/product.model')
var search;

module.exports.postSearch = async function(req, res){
    var search = req.body.search;
    var searchDate = await Product.distinct("date", {});
    // var products = await Product.find({"date": search});
    var products = await Product.find({$text: {$search: search}});

    res.render('products/index', {
        data: products,
        values: search,
        searchDate: searchDate
    })
}

async function doiten(req, res){
    var list = document.getElementById('listname').value;
    document.getElementById('demo').innerHTML = list.toString();
    search = list;
}