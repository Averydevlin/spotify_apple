require('dotenv').config()
var express = require('express');
var router = express.Router();

/* GET access token. */
router.get('/auth', function(req, res) {
    var scopes = 'playlist-modify-private playlist-read-private playlist-modify-public user-library-modify user-library-read';
    res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + process.env.SPOTIFY_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
});

module.exports = router;
