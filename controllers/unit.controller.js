var Unit = require('../models/unit.model')

module.exports.unit = async function(req, res){
    var unit = await Unit.find();
    res.render('unit/index', {
        unit: unit
    });
}

module.exports.postSearch = async function(req, res){
    var search = req.body.search;
    var findUnit = await Unit.find( { $text: { $search: search } } );
    res.render('Unit/index', {
        findUnit: findUnit,
        values: search,
    })
}

module.exports.update = async function(req, res){
    var update = await Unit.find({_id: req.params.id});
    res.render('unit/update', {
        update: update
    })
}

module.exports.putUpdate = async function(req, res){
    await Unit.updateOne({_id: req.params.id}, req.body);
    res.redirect('/unit');
}

module.exports.deleteUnit = async function(req, res){
    await Unit.deleteOne({_id: req.params.id});
    res.redirect('/unit');
}

module.exports.insert = function(req, res){
    res.render('unit/insert');
}

module.exports.postInsert = async function(req, res){
    await Unit.insertMany(req.body);
    res.redirect('/unit');
}