var express = require('express');
const app = express();
var router = express.Router();

router.use('/driver',require('./drivers.js'));

module.exports = router;