var express = require('express');
var bodyParser = require('body-parser');
var authRouter = require('./routes/auth.route');


// thư viện xài PUT
var methodOverride = require('method-override');


var userRouter = require('./routes/user.route'); 
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/QL_KHO', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// kiểm tra kết nối thành công hay không
mongoose.connection.once('open', function(){
    console.log('connection successfully');
}).on('error', function(error){
    console.log('error is: ', error)
})


// var sessionMiddleware = require('./middlewares/session.middleware')


var productsRoute = require('./routes/product.router')
var requireMiddleware = require('./middlewares/auth.middleware')
var supplierRoute = require('./routes/supplier.router')
var unitRoute = require('./routes/unit.router')
var warehouseRoute = require('./routes/warehouse.route')
var exportRoute = require('./routes/export.router')
var indexRoute = require('./routes/index.router')
var acountRoute = require('./routes/acount.router')
var statisticsRoute = require('./routes/statistics.router')

var db = require('./db')

var port = 3000;

var app = express();
app.set('view engine', 'pug');
app.set('views', './views'); // xét views trong thư mục views

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// sử dụng PUT, DELETE
app.use(methodOverride('_method'));

// app.use(sessionMiddleware): nó sẽ ảnh hưởng đến all các đường dẫn mà chúng ta sử dụng

// chạy file css, lưu trữ các file tĩnh trong public
app.use(express.static('public'));

// app.get('/', function(req, res){
//     res.render('index')
// });

// app.post('/', function(req, res){
//     var username = req.body.username;
//     var password = req.body.password;
//     var user = db.get('users').find({username: username}).value();
//     var errors = [];
 
//     if(!user)
//     {
//         res.render('index', {
//             errors: ["Username dows not exists"],
//             values: req.body
//         })
//         return;
//     }
    
//     if(user.password !== password)
//     {
//         res.render('index', {
//             errors: ["Wrong Password"],
//             values: req.body
//         })
//         return;
//     }
//     // mục đích của cái này là có thể hiển thị nhiều lỗi 1 lần, còn k có thì chỉ hiển thị 1 lỗi 1 lần
//     // else if(errors.length)
//     // {
//     //     res.render('index', {
//     //         errors: errors    
//     //     });
//     //     return;
//     // }
//     res.redirect ('/users');
// })

app.use('/users', requireMiddleware.requireAuth, userRouter);
app.use('/auth', requireMiddleware.checkLogin, authRouter);
app.use('/products', requireMiddleware.requireAuth, productsRoute);
app.use('/supplier', requireMiddleware.requireAuth, supplierRoute);
app.use('/unit', requireMiddleware.requireAuth, unitRoute);
app.use('/warehouse', requireMiddleware.requireAuth, warehouseRoute)
app.use('/export', requireMiddleware.requireAuth, exportRoute)
app.use('/index', requireMiddleware.requireAuth, indexRoute)
app.use('/acount',requireMiddleware.requireAuth, acountRoute)
app.use('/statistics', requireMiddleware.requireAuth, statisticsRoute)

app.listen(port, function(){
    console.log('Server listening on port ' + port);
}); 