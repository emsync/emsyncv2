const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  //do something
});

/**
 * SPOTIFY LOGIN ROUTES START
 */
router.get('/login', (req, res, next) => {
  console.log('executing /login!!!!');
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  console.log('in /login, state is: --------', state);
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
