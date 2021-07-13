var User = require('../models/user.model');
var db = require('../db');
module.exports.acount = async function(req, res){
    var acount = await User.find();
    res.render('acount/index',{
        acount: acount
    });
}

module.exports.changePass = async function(req, res){
    res.render('acount/changePass')
}

module.exports.postChangePass = async function(req, res){
    var passcu = req.body.passcu;
    var passmoi = req.body.passmoi;
    var password = db.get('users').find({password: passcu}).value();
    if(!password)
    {
        res.render('acount/changePass', {
            errpass: ['Mật khẩu không hợp lệ!'],
            passcu: passcu,
            passmoi: passmoi
        });
        return;
    }
    await User.updateOne({username: "admin"}, {$set: {password: passmoi}});
    db.get('users')
        .find({username: 'admin'})
        .assign({password: passmoi})
        .value();
    res.clearCookie('userID');
    res.redirect('/index');
}

module.exports.logout = function(req,res){
    res.clearCookie('userID');
    res.redirect('/acount');
}