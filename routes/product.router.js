var express = require('express')
var router = express.Router()
var controller = require('../controllers/product.controller')

router.get('/', controller.product)
router.post('/', controller.postSearch)


router.get('/delete', controller.xoa)
router.post('/delete', controller.post)

router.get('/update/:id', controller.update)
router.put('/update/:id', controller.postUpdate)

router.delete('/:id', controller.destroy)

router.get('/insert', controller.insert);
router.post('/insert', controller.postInsert);

module.exports = router
