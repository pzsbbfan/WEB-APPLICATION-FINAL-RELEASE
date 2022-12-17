var express = require('express');
var router = express.Router();

let indexController = require('../controller/index');

/* GET users listing. */
router.post('/login',indexController.processLoginPage);

module.exports = router;
