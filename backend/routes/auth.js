require('dotenv').config()
var express = require('express');
var router = express.Router();
var base64 = require('base-64')
const axios = require('axios').default; 
const { response } = require('express');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

/* GET access token. */

var redirect = 'https://d8b6-2001-569-56c2-d800-2520-7cc9-5589-82cf.ngrok.io/auth/callback/'

// Routes for Authentication and Getting the Auth Code 
router.get('/', function(req, res) {
    var scopes = 'playlist-modify-private playlist-read-private playlist-modify-public user-library-modify user-library-read';
    redirect_uri = redirect; 
    res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + process.env.SPOTIFY_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri));
       
})

// GET code from auth flow URL 
router.get('/callback', function(req, res) {
    let authCode = req.query.code
    console.log(`Success, your Auth Code: ${authCode}`)

    res.send(`okay good... \n the CODE is:  ${authCode.substring(0, 25)}...`);
    console.log(`Auth code in get call ${authCode}`); 
    getBearer(authCode); 
})

const getBearer = async (authCode) => { 

    try {
        const resp = await axios({
            url: 'https://accounts.spotify.com/api/token',
            method: 'post',
            headers: { 
                'Authorization': `Basic ${base64.encode(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`)}`,
                'Content-Type':'application/x-www-form-urlencoded'
            },
            params: {
                grant_type: 'authorization_code',
                code: authCode,
                redirect_uri: redirect
            }
        }); 
        
        var tokenData = resp.data; 

        saveAuthObject(tokenData); 
        return tokenData; 

    } catch (err) {
        console.error(err.response.data); 
        getRefresh(); 
    }
}

const getRefresh = async () => { 
    try{
        const resp = await axios({headers, 

            params: { 
                grant_type: 'refreshToken',
                refresh_token: localStorage.getItem('refreshToken'),
            }
        })
        console.log('decided to use a refresh token')
        saveAuthObject(resp); 
        
    } catch {
        console.error(err); 
        console.log('your refresh token failed to run'); 
    }
}


async function saveAuthObject(response) { 
    var stringResponse = JSON.stringify(response); 

    console.log(`saveAuthObject function ran \n\n\n\n\n\n ${stringResponse}`)
    localStorage.setItem('accessToken', response.access_token); 
    localStorage.setItem('refreshToken', response.refresh_token); 
    console.log("\n\n\n"); 
    console.log(localStorage.getItem('accessToken')); 

}; 

module.exports = router; 
