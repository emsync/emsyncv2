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

router.put('/refreshToken/:userId', async (req, res, next) => {
  // console.log('in api/spotify/refreshToken');
  // console.log('old access token is: ', req.user.accessToken);
  // console.log('old refreshToken is: ', req.user.refreshToken);

  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', req.user.refreshToken);

    const refreshedToken = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: {
          Authorization:
            'Basic YmRkZDExMDFkOTc1NDRmMjkzMDkyOTEwNWEwYzBmMDA6ZWY3NGYyYWRhNTQxNGQ3N2JjNzY2NTU0YTg4NWQwNDc='
        }
      }
    );
    // console.log('new refreshedToken:', refreshedToken.data.access_token);

    const user = await User.findById(req.user.id);
    await user.update({accessToken: refreshedToken.data.access_token});
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


// { [WebapiError: Unauthorized] name: 'WebapiError', message: 'Unauthorized', statusCode: 401 }