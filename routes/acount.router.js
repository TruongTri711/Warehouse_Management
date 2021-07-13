var express = require('express')
var router = express.Router();
var controller = require('../controllers/acount.controller')

router.get('/', controller.acount);

router.get('/changePass', controller.changePass)
router.post('/changePass', controller.postChangePass)

router.get('/logout', controller.logout)

module.exports = router