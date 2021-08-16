var express = require('express');
var router = express.Router();
var controller = require('../controllers/warehouse.controller')

router.get('/', controller.warehouse)
router.delete('/:id', controller.deleteCoupon)
router.post('/', controller.postSearch)

router.get('/insertCoupon', controller.insertCoupon)
router.post('/insertCoupon/:id/:id1/:numberImport/:priceImport', controller.postInsertCoupon)

router.get('/updateCoupon/:id', controller.updateCoupon)
router.put('/updateCoupon/:id', controller.putUpdateCoupon)

router.get('/importHistory', controller.importHistory)
router.delete('/importHistory/:id', controller.deleteImportHistory)
router.post('/importHistory', controller.postSearchHistory)

router.get('/viewCoupon/:id', controller.viewCoupon)

router.get('/report/:id', controller.report)

module.exports = router