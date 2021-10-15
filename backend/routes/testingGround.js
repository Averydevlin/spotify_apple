require('dotenv').config()
var express = require('express');
var router = express.Router();
var base64 = require('base-64');


//  this is all a testing ground for the code im trying to implement. 



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('you are an authenticated Spotify user');
});

let data = `${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`
let buff = base64.encode(data); 


console.log(buff); 

module.exports = router;
