var Supplier = require('../models/supplier.model');

module.exports.supplier = async function(req, res)
{
    var supplier = await Supplier.find();
    res.render('supplier/index', {
        supplier: supplier
    });
}

module.exports.postSearch = async function(req, res){
    var search = req.body.search;
    var find = await Supplier.find( { $text: { $search: search } } );
    res.render('supplier/index', {
        find: find,
        values: search,
    })
}

module.exports.deleteSupplier = async function(req, res){
    await Supplier.deleteOne({_id: req.params.id});
    res.redirect('back');
}

module.exports.update = async function(req, res){
    var id = req.params.id;
    var find = await Supplier.find({"_id": id})
    res.render('supplier/update', {
        supplier: find
    });
}

module.exports.postUpdate = async function(req, res){
    await Supplier.updateOne({_id: req.params.id}, req.body)
    res.redirect('/supplier');
}

module.exports.insert = function(req, res){
    res.render('supplier/insert');
}

module.exports.postInsert = async function(req, res){
    await Supplier.create(req.body);
    res.redirect('/supplier');
}