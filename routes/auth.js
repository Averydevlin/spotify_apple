require('dotenv').config()
var express = require('express');
var router = express.Router();

/* GET access token. */
router.get('/', function(req, res) {
    var scopes = 'playlist-modify-private playlist-read-private playlist-modify-public user-library-modify user-library-read';
    redirect_uri = 'https://d8b6-2001-569-56c2-d800-2520-7cc9-5589-82cf.ngrok.io/auth/callback/'
    res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + process.env.SPOTIFY_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));

}); 

// GET code from auth flow URL 
router.get('/callback', function(req, res) {
    console.log("hey, this exists")
    console.log(req.query.code)
    res.send(`the CODE is:  ${req.query.code.substring(0, 25)}...`)
})



module.exports = router;
