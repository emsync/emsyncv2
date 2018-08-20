const router = require('express').Router();
const {User} = require('../db/models');
const axios = require('axios');
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');
const AuthConfig = require('../../secrets');

const spotifyApi = new SpotifyWebApi({
  clientId: AuthConfig.clientID,
  clientSecret: AuthConfig.clientSecret,
  redirectUri: AuthConfig.clientRedirectURI
});



router.post('/', async (req, res, next) => {
  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);
  console.log(spotifyApi);

  // console.log('hello from spotify route');

  try {
    const response = await spotifyApi.searchTracks(req.body.q);
    res.send(response.body);
  } catch (err) {
    if (err.message === 'Unauthorized'){
      try{
        spotifyApi.setAccessToken(req.user.refreshToken);
        const freshResponse = await spotifyApi.searchTracks(req.body.q);
        res.send(response.body)
      }catch(err){
        console.log('Couldnt refresh Token')
        console.log(err)
      }
    }
    console.log(err);
  }
});
module.exports = router;


// { [WebapiError: Unauthorized] name: 'WebapiError', message: 'Unauthorized', statusCode: 401 }