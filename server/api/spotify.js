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

router.put('/refreshToken', async (req, res, next) => {
  console.log('in api/spotify/refreshToken');
  console.log('old access token is: ', req.user.accessToken);

  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);
  try {
    const refreshedToken = await spotifyApi.refreshAccessToken();
    spotifyApi.setAccessToken(refreshedToken.body.access_token);
    console.log('new access token is: ', refreshedToken.body.access_token);

    const user = await User.findById(req.user.id);
    await user.update({accessToken: refreshedToken.body.access_token});
    console.log('from db: user.accessToken is: ', user.accessToken);
    res.status(201);
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res, next) => {
  spotifyApi.setAccessToken(req.user.accessToken);
  spotifyApi.setRefreshToken(req.user.refreshToken);

  try {
    const response = await spotifyApi.searchTracks(req.body.q);
    res.send(response.body);
  } catch (err) {
    if (err.statusCode === 401) {
      const refreshedToken = await spotifyApi.refreshAccessToken();
      spotifyApi.setAccessToken(refreshedToken.body.access_token);

      try {
        const response = await spotifyApi.searchTracks(req.body.q);
        res.send(response.body);
      } catch (err) {
        console.log('Error refreshing token :', err);
      }
    }
    // console.log(err);
  }
});
module.exports = router;
