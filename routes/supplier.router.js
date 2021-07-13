var express = require('express');
var router = express.Router();
var controller = require('../controllers/supplier.controller');


router.get('/', controller.supplier);
router.post('/', controller. postSearch)

router.delete('/:id', controller.deleteSupplier)

router.get('/update/:id', controller.update);
router.put('/update/:id', controller.postUpdate);

router.get('/insert', controller.insert)
router.post('/insert', controller.postInsert);



module.exports = router;