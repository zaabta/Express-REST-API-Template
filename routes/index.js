var express = require('express');
var router = express.Router();

router.use('/users', require("../lib/users/routes"));

module.exports = router;
