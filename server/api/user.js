const router = require('express').Router();
var request = require('request'); // "Request" library
const {User} = require('../db/models');
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
});

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
router.get('/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user === undefined) {
    res.send('No data found');
  } else {
    res.send(user);
  }
});
