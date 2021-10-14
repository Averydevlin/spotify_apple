require('dotenv').config()
var express = require('express');
var router = express.Router();
const axios = require('axios').default; 
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

/* GET access token. */

var redirect = 'https://d8b6-2001-569-56c2-d800-2520-7cc9-5589-82cf.ngrok.io/auth/callback/'
var authorizeURL = 'https://accounts.spotify.com/api/token' 


// Routes for Authentication and Getting the Auth Code 
router.get('/', function(req, res) {
    var scopes = 'playlist-modify-private playlist-read-private playlist-modify-public user-library-modify user-library-read';
    redirect_uri = redirect; 
    res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + process.env.SPOTIFY_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));

}); 

// GET code from auth flow URL 
router.get('/callback', function(req, res) {
    var authCode = req.query.code
    console.log(`Auth Code: ${authCode}`)

    res.send(`okay good... \n the CODE is:  ${req.query.code.substring(0, 25)}...`);
    bearer(authCode);
})


bearer = (authCode) => {
axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    headers: { 
        'Authorization': 'Basic MWMyMzcwMzI2NjliNGUyNmFiMWM2NzczZjVjZTMyYzE6YWZlYzQ5Yzk2ODJiNDUyNGFkMmVjMTM0OThkZTRiYWQ=',
        'Content-Type':'application/x-www-form-urlencoded'
    },
    params: {
        grant_type: 'authorization_code',
        code: authCode, 
        redirect_uri: redirect
    }
}).then(function(response) {
    localStorage.setItem('auth', response.data.access_token); 
    localStorage.setItem('authObject', JSON.stringify(response.data)); 

    console.log("\n\n\n"); 
    console.log(localStorage.getItem('auth')); 
    console.log(JSON.parse(localStorage.getItem('authObject'))); 
  });
}; 

module.exports = router;
