const { default: axios } = require('axios');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
axios.defaults.baseURL = 'https://api.spotify.com/v1';

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('spotify', { title: 'our Spotify app', name: `${localStorage.getItem('id')}` });
});

router.get('/playlists', function(req, res, next) {
    res.render('spotify', { title: 'your Spotify playlists', name: `${localStorage.getItem('id')}` });
    getPlaylists(); 
})

// ME endpoint, identifying the user. 
getMe = () => {
    axios.get('/me', {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('auth')}`,
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
    .then(function (res) {
        // console.log(res)
        localStorage.setItem('id', res.data.id)
    });
}; 

// Get all of the 
getPlaylists = () => {
    axios.get('/me/playlists', {
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('auth')}`,
            'Content-Type':'application/x-www-form-urlencoded'
        }
    }).then(function(res) {
        console.log(res.data.items); 
        localStorage.setItem('playlistData', res.data.items)
    })
}

module.exports = router;
