var db = require('../db')
// var md5 = require('md5')

module.exports.login = function(req, res){
    res.render('auth/login');
}

module.exports.postLogin = function(req, res){
    var user = req.body.username;
    var pass = req.body.password;
    var username = db.get('users').find({username: user}).value();

    if (!username)
    {
        res.render('auth/login', {
            erroruser: 
                ['Tài khoản không tồn tại !'
            ],
            values: req.body
        });
        return;  
    }
    if (pass !== username.password)
    {
        res.render('auth/login', {
            errorpass: [
                'Mật khẩu không hợp lệ'
            ],
            values: req.body
        });
        return;
    }
    res.cookie('userID', username.id);

    res.redirect('/index');
};