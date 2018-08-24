const passport = require('passport');
const router = require('express').Router();
const SpotifyStrategy = require('passport-spotify').Strategy;
const {User} = require('../db/models');
module.exports = router;

/**
 * For OAuth keys and other secrets, your Node process will search
 * process.env to find environment variables. On your production server,
 * you will be able to set these environment variables with the appropriate
 * values. In development, a good practice is to keep a separate file with
 * these secrets that you only share with your team - it should NOT be tracked
 * by git! In this case, you may use a file called `secrets.js`, which will
 * set these environment variables like so:
 *
 * process.env.GOOGLE_CLIENT_ID = 'your google client id'
 * process.env.GOOGLE_CLIENT_SECRET = 'your google client secret'
 * process.env.GOOGLE_CALLBACK = '/your/google/callback'
 */

if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
  // console.log('Spotify client ID / secret not found. Skipping Spotify OAuth.');
} else {
  const spotifyConfig = {
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT_URI
  };

  const strategy = new SpotifyStrategy(
    spotifyConfig,
    async (aToken, rToken, profile, done) => {
      // console.log('Profile: ', profile);
      const userName = profile.id;
      const email = profile.emails[0].value;
      const spotifyDisplayName = profile.username;
      const accessToken = aToken;
      const refreshToken = rToken;
      const photos = profile.photos;

      var data = {
        name: userName,
        email: email,
        spotifyDisplayName: userName,
        accessToken: aToken,
        refreshToken,
        rToken
      };

      const user = await User.findOne({
        where: {
          name: userName
        }
      });

      if (user) {
        await user.update({
          accessToken: accessToken,
          refreshToken: refreshToken
        });
        done(null, user);
      } else {
        User.create({
          name: userName,
          email: email,
          spotifyDisplayName: userName,
          accessToken: accessToken,
          refreshToken: refreshToken,
          imageUrl: photos[0] || null
        });
        done(null, user);
      }
    }
  );

  passport.use(strategy);

  router.get(
    '/',
    passport.authenticate('spotify', {
      scope: [
        'streaming',
        'user-read-currently-playing',
        'user-read-birthdate',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state'
      ],
      showDialog: true
    })
  );

  router.get(
    '/callback',
    passport.authenticate('spotify', {
      scope: [
        'streaming',
        'user-read-currently-playing',
        'user-read-birthdate',
        'user-read-email',
        'user-read-private',
        'user-modify-playback-state'
      ],
      successRedirect: '/user',
      failureRedirect: '/',
      showDialog: true
    })
  );

  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
  });
}
