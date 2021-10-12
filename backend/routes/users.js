require('dotenv').config()

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('you are an authenticated Spotify user');
});

module.exports = router;
