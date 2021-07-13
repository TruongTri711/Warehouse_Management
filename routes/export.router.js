var express = require('express')
var router = express.Router();
var controller = require('../controllers/export.controller')

router.get('/', controller.export)
router.delete('/:id', controller.deleteExport)
router.post('/', controller.postSearch)

router.get('/updateExport/:id', controller.updateExport)
router.put('/updateExport/:id', controller.postUpdateExport)

router.get('/insertExport', controller.insertExport)
router.post('/insertExport', controller.postInsertExport)

router.get('/exportHistory', controller.exportHistory)
router.delete('/exportHistory/:id', controller.deleteExportHistory)
router.post('/exportHistory', controller.postSearchHistory)

router.get('/viewExport/:id', controller.viewExport)

module.exports = router