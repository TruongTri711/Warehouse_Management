const { render } = require('pug');
var Product = require('../models/product.model');


// var db = require('../db')

module.exports.product = async function(req, res){
    // var page = parseInt(req.query.page) || 1; // n
    // var perPage = 8; // x

    // var start = (page - 1) * perPage;
    // var end = page * perPage;


    // res.render('products/index', {
    //     data: db.get('products').value().slice(start, end),
    // });

    // Product.find({}).then(function(products){
    //     res.render('products/index', {
    //         products: products
    //     });
    // })

    // use assync
    var products = await Product.find();
    res.render('products/index', {
        products: products
    });

    

    // var search = req.body.search;
    // var searchDate = await Product.distinct("date", {});
    // // var products = await Product.find({"date": search});
    // var products = await Product.find({$text: {$search: search}});

    // res.render('products/index', {
    //     data: products,
    //     values: search,
    //     searchDate: searchDate
    // })
}

module.exports.postSearch = async function(req, res){
    var search = req.body.search;
    var products = await Product.find({$text: {$search: search}});

    res.render('products/index', {
        data: products,
        values: search,
    })
}

module.exports.xoa = function (req, res){
    res.render('products/delete');
}

module.exports.post = async function (req, res){
    var name = req.body.name;
    
    await Product.findOneAndRemove({"name": name});
    // console.log(name)

    res.redirect('/products');
}

module.exports.update = async function(req, res){
    var id = req.params.id;
    var update = await Product.find({"_id": id})
    res.render('products/update', {
        update: update,
    })
}

module.exports.postUpdate = async function(req, res){
    await Product.updateOne({_id: req.params.id}, req.body)
    res.redirect('/products');
}

module.exports.destroy = async function(req, res){
    await Product.deleteOne({_id: req.params.id});
    res.redirect('back')
}

module.exports.insert = function(req, res){
    res.render('products/insert');
}

module.exports.postInsert = async function(req, res){  
    await Product.create(req.body)
    res.redirect('/products')
}
