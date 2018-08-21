const router = require('express').Router();
const {User} = require('../db/models');
const axios = require('axios');
const AuthConfig = require('../../secrets');
var giphy = require('giphy-api')('rdZ7btyes237dD4J2N8iuWZ4F3kj3WgI');

router.post('/', async (req, res, next) => {
  console.log('request is', req.body);
  const response = await giphy.search({
    q: req.body.q,
    rating: 'pg',
    fmt: 'json'
  });
  res.send(response.data);
});

router.get('/trending', async (req, res, next) => {
  const response = await giphy.trending({rating: 'pg', fmt: 'json'});
  res.send(response.data);
});

module.exports = router;
