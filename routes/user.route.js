var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller')
var validate = require('../validate/user.validate')
//multer giúp đọc dữ liệu từ request của mình
var multer  = require('multer')
// đường dẫn upload, xem upload vào đâu
var upload = multer({ dest: './public/uploads/' })

router.get('/', controller.index);

// router.get('/cookie',function(req, res, next){
//     res.cookie('user-id', 12345);
//     res.send('Hello');
// })

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/register', controller.register)

router.get('/login', controller.login)

router.get('/cookie', controller.cookie)

router.get('/:id', controller.get);

router.post('/create', 
    // đọc cái ảnh từ client gửi lên
    upload.single('avatar') , 
    validate.postCreate, 
    controller.postCreate
);
 

router.post('/register', controller.postInsert)

module.exports = router;