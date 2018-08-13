const router = require('express').Router();
var request = require('request'); // "Request" library
const { User } = require('../db/models');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = router;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

router.use(cors());
router.use(cookieParser());

router.get('/', async (req, res, next) => {
  console.log(client_id, client_secret, redirect_uri);
});

/**
 * SPOTIFY LOGIN ROUTES START
 */
router.get('/login', (req, res, next) => {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  // your application requests authorization
  var scope = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
});

router.get('/callback', function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;
  // console.log(
  //   `in /callback, code is ${code}, state is ${state}, storedState is ${storedState}`
  // );
  if (state === null || state !== storedState) {
    res.redirect(
      '/#' +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: 'Bearer ' + access_token },
          json: true,
        };

        // use the access token to access the Spotify Web API
        request.get(options, async function(error, response, body) {
          var data = {
            name: body.id,
            email: body.email,
            access_token: access_token,
            refresh_token: refresh_token,
          };

          // await User.findOrCreate({
          //   where: {
          //     name: body.id,
          //     email: body.email,
          //     spotifyDisplayName: body.id,
          //     accessToken: access_token,
          //     refreshToken: refresh_token,
          //   },
          // });
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          '/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
});

router.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token,
      });
    }
  });
});

const generateRandomString = function(length) {
  var text = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';
/**
 * SPOTIFY ROUTES END
 */

//GET all users
router.get('/users', async (req, res, next) => {
  const users = await User.findAll();
  if (users.length <= 0) {
    res.send('No data found');
  } else {
    res.send(users);
  }
});

//GET user by name
router.get('/user', async (req, res, next) => {
  const user = await User.findById(1);
  if (user === undefined) {
    res.send('No data found');
  } else {
    res.send(user);
  }
});
