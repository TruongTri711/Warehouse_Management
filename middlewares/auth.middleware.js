var db = require('../db');

module.exports.requireAuth = function(req, res, next)
{
    if(!req.cookies.userID){
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find({id: req.cookies.userID}).value()
    // check để tránh trường hợp người ngoài tự tạo cookie, dùng này để cho dù tạo cookie mà kiểm trà không giống id của userID thì cũng vậy
    if(!user){
        res.redirect('/auth/login');
        return;
    }

    // res.locals.success = true: la2 de963 hien63 thi5 ten len tren khac khi login thanh cong
    // user là lấy từ user ở trên
    res.locals.user = user;
    
    next()
}

module.exports.checkLogin = function(req, res, next){
    if (req.cookies.userID)
    {
        res.redirect('/index')
    }
    next()
}