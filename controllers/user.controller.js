var db = require('../db')
var path = require('path')
var Product = require('../models/product.model')

// ===================== shortid ===================== 
var shortid = require('shortid')
const { json } = require('body-parser')

module.exports.index = function(req, res){
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchUser = db.get('users').value().filter(function(user){
        // nếu q nằm trong string name thì nó trả về > -1
        // ngược lại trả về -1
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });

    res.render('users/index', {
        users: matchUser
    });
}

module.exports.create = function(req,res){
    console.log(req.cookies) // cookies phải có s nó mới nhận
    res.render('users/create')
}

module.exports.register = function(req, res){
    console.log(req.cookies)
    res.render('users/register')
}

module.exports.login = function(req, res){
    res.render('users/login')
}

module.exports.cookie = function(req, res, next){
    res.cookie('user-id', 12345);
    res.send('Hello Trí');
}

module.exports.get = function(req, res){
    // params là chứa biến 
    var id = req.params.id;
    // find({id: id}): id thứ 2 là id trong file db.json
    // id thứ 1 là id trong url
    var user = db.get('users').find({id: id}).value()

    res.render('users/view', {
        user: user
    });
}

module.exports.postCreate = function(req, res){
    req.body.id = shortid.generate();
    // trên widow: public\\uploads\\123, dùng path.sep để cắt đường dẫn thành những chuỗi string, và sau đó join với ký hiệu \\
    req.body.avatar = req.file.path.split(path.sep).slice(1).join('\\');
    // trên Untutu: public/uploads/123, dùng split('/') để cắt đường dẫn thành những chuỗi string, và join với ký hiệu /

    db.get('users').push(req.body).write();
    // trở lại trang users
    res.redirect('/users');
}

module.exports.postInsert = async function(req, res){

    var ten = req.body.name;
    var anh = req.body.image;
    var donvi = req.body.unit;
    var gia = req.body.price;
    var soluong = req.body.number;
    var ngay = req.body.day;
    await Product.insertMany(
        [
            {
                "name": ten,
                "image": anh,
                "unit": donvi,
                "price": gia,
                "number": soluong,
                "date": ngay
            }
        ]);

    // console.log(json(product));
    res.redirect('/products')
}

