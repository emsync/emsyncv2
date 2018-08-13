const router = require('express').Router();
const { User } = require('../db/models');
const axios = require('axios');

module.exports = router;

//GET song by Id
/* "https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5"
-H "Accept: application/json"
-H "Content-Type: application/json"
-H "Authorization: Bearer TOKEN GOES HERE*/

router.get('/song', async (req, res, next) => {
  // console.log('getting item from Spotify');
  const user = await User.findById(1);
  console.log('user', user);
  const userRefreshToken = user.refreshToken;
  const instance = axios.create({
    baseURL: `https://api.spotify.com/v1`,
    headers: { Authorization: `Bearer ${userRefreshToken}` },
  });
  const response = await instance.get(
    `/search?q=${req.query.q}&type=${req.query.type}&market=${
      req.query.market
    }&limit=${req.query.limit}&offset=${req.query.offset}`
  );
  console.log('response', response);

  if ((!response.error && response.status === 200) || !response) {
    res.send(JSON.parse(response.body));
  } else {
    res.send('No song found');
  }
});
