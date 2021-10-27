const { default: axios } = require('axios');
const { json } = require('express');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
axios.defaults.baseURL = 'https://api.spotify.com/v1';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;

var express = require('express');
// const { reseller } = require('googleapis/build/src/apis/reseller');
var router = express.Router();

var Obj = []; 
var playlistList = []; 
var playlistSongIds = []; 
var headers = { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}; 
// 'Content-Type':'application/x-www-form-urlencoded'}
var masterlist = JSON.parse(localStorage.getItem('masterlist'))
console.log(masterlist); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('spotify', { title: 'our Spotify app', name: `${localStorage.getItem('id')}` });
});

router.get('/playlists', function(req, res, next) {
    res.render('spotify', { title: 'your Spotify playlists', name: forName });
    getPlaylists(); 
})

// ME endpoint, identifying the user. 

const getMeDetails = async () => { 
    try { 
        const resp = await axios.get('/me', {headers: headers})
        var userData = resp.data; 
        return userData; 
    } catch (err) { 
        console.error(err); 
    }
}

// Get all of the playlists associated with a user. 
 async function getPlaylistData() {
    try {
        const resp = await axios.get('/me/playlists', { headers: headers });
        var playlistObj = [];
        let playlistsData = resp.data.items;
        for (const i of playlistsData) {
            playlistObj.push({
                id: i.id,
                name: i.name
            });
        }
        localStorage.setItem('playlistData', JSON.stringify(playlistObj));
        return playlistObj;
    } catch (err) { console.log(err); }
}


async function getPlaylistIds() {
    var playlistIdArr = [];
    try {
        const resp = await axios.get('me/playlists', { headers: headers });
        var playlistData = resp.data.items;
        for (const i of playlistData) {
            playlistIdArr.push(i.id);
        }
        localStorage.setItem('playlistIdArr', playlistIdArr);
        localStorage.setItem('playlistId', playlistIdArr[0])
        return playlistIdArr;
    } catch (err) {
        console.error(err);
    }
}

// add a single song to the master playlist 
async function postToPlaylist(song_ids, playlist_id) {
    
    console.log(headers); 

    try {
        const resp = await axios.post(`playlists/${playlist_id}/tracks`, {
            body: {
                uris: song_ids
            }
        });

    } catch (err) {
        console.error(err);
    }
}

postToPlaylist('spotify:track:6gWG3u67LxRO9FQaQ8Glsg', '2v1VOkNKqV8e7vUg2mD5g9')

// get all songs from a specified playlist
async function getSongsFromPlaylist(playlist_id) {
    try {
        const resp = await axios.get(`/playlists/${playlist_id}/tracks`, { headers: headers });
        let playlistData = resp.data.items;
        for (const i of playlistData) {
            playlistSongIds.push(i.track);
        }
        // console.log(playlistSongIds);
        localStorage.setItem('playlistSongIds', JSON.stringify(playlistSongIds))
        return playlistSongIds;

    } catch (err) {
        console.log(err);
    }
}

const addCovert = async (image_url) => {
    try {
        const resp = axios.post(`/playlists/${playlist_id}/images`)
    } catch {

    }
}

async function get() { 
    var pd = await getPlaylistData(); 
    console.log(pd); 
}



async function getTheSongs() {
    try {
    const pd = await getPlaylistData()
    const songs = await getSongsFromPlaylist(pd[14].id); 
        for (const i of songs ) {
         Obj.push({name: i.name, uri: i.uri, id: i.id, artist: i.artists[0].name })
        }
    return Obj; 
    } catch (err) { 
        console.log(err)

    }
    return Obj; 
}


async function addToLibrary() {
    var uriObj = []; 
    var playlistId = JSON.parse(localStorage.getItem('masterlist'))

    try { 

        const getSongs = await getTheSongs(); 
        
        for (const i of getSongs) {
            uriObj.push(i.uri); 
        }

        localStorage.setItem('uriObj', uriObj); 
        console.log(uriObj, playlistId.id); 
    postToPlaylist(uriObj, playlistId.id)

    } catch (err) {
        console.error(err); 
    }
}

// addToLibrary(); 

// getPlaylistIds(); 

module.exports = router;



// for (var i = 0; i < res.data.items.length; i++) {
//     // console.log(res.data.items[i].name)
//     playlistList.push(res.data.items[i].name); 
// }
// // console.log(playlistList); 
// return playlistList;