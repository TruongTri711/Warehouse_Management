var express = require('express')
var router = express.Router()
var controller = require('../controllers/unit.controller');

router.get('/', controller.unit)
router.post('/', controller.postSearch)

router.delete('/:id', controller.deleteUnit)

router.get('/update/:id', controller.update);
router.put('/update/:id', controller.putUpdate)

router.get('/insert', controller.insert)
router.post('/insert', controller.postInsert)

module.exports = router