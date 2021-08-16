var express = require('express')
var router = express.Router();
var controller = require('../controllers/statistics.controller')

router.get('/', controller.index)
router.post('/', controller.postSearchIndex)

router.get('/viewReport/:id', controller.viewReport)

router.get('/report/:id', controller.report)

router.get('/revenue', controller.revenue)
router.post('/revenue', controller.postRevenue)

module.exports = router;