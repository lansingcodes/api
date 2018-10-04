var express = require('express');
var router = express.Router();
var eventsController = require('./../controllers/events');

router.get('/upcoming/list', eventsController.list);
router.get('/upcoming/search/:query', eventsController.search);

module.exports = router;
