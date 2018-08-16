const router = require('express').Router();
const {User} = require('../db/models');
const axios = require('axios');
const request = require('request');

/*"https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5"-H
   -H "Authorization: Bearer BQAoZNbnvxmBFe8qbcSWYlGFevTljalp1HgqbD-o7xO-xOfjnlUCVD1J30NlZ7F0rNKPDsv1C8AXlDpLh3uIU8DfyR-S6euNIAneZODj1aebqGLBvIrVigMHf8DKzWU6gW_QdRwfATQib_L4"*/

router.post('/', async (req, res, next) => {
  // console.log('Hi from spotify!')
  // console.log('query params =>',req.body)

  const userRefreshToken = req.body.userRefreshToken;
  const options = {
    url: `https://api.spotify.com/v1/ search?q=${
      req.query.q
    }&type=track%2Cartist&market=${req.body.market || 'US'}&limit=${req.body
      .limit || '10'}&offset=${req.body.offset || '5'}`,
    headers: {Authorization: `Bearer ${userRefreshToken}`}
  };

  const spotifyResult = (error, response, body) => {
    if (!error && response.status === 200) {
      res.send(response.body);
    } else {
      res.send(response);
    }
  };
  request.get(options, spotifyResult);
});
module.exports = router;
