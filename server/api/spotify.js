const router = require('express').Router();
const {User} = require('../db/models');
const axios = require('axios');
const request = require('request');
const SpotifyWebApi = require('spotify-web-api-node');
const AuthConfig = require("../../secrets")


const spotifyApi = new SpotifyWebApi({
  clientId: AuthConfig.clientID,
  clientSecret: AuthConfig.clientSecret,
  redirectUri : AuthConfig.clientRedirectURI,
});


  /*"https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5"-H
   -H "Authorization: Bearer BQAoZNbnvxmBFe8qbcSWYlGFevTljalp1HgqbD-o7xO-xOfjnlUCVD1J30NlZ7F0rNKPDsv1C8AXlDpLh3uIU8DfyR-S6euNIAneZODj1aebqGLBvIrVigMHf8DKzWU6gW_QdRwfATQib_L4"*/
  
  
  
  
//   router.post('/', async (req, res, next) => {
//       console.log('Hi from spotify!')
//       console.log('query params =>',req.body)

//   const accessToken = req.body.accessToken;
//   const options = {
//       url: `https://api.spotify.com/v1/ search?q=${ req.query.q }&type=track%2Cartist&market=${req.body.market || 'US' }&limit=${ req.body.limit || '10' }&offset=${ req.body.offset || '5' }`,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//       'Content-Type':  `application/x-www-form-urlencoded`
//   }
//   };

//   const spotifyResult = (error,response,body) => {
//     if (!error && response.status === 200) {
//       res.send(response.body);
//     } else {
//       res.send(response);
//     }
//   }
//   request.get(options,spotifyResult)

// });

router.post('/', async(req,res,next) => {
  spotifyApi.setAccessToken(req.user.accessToken);

  console.log('hello from spotify route'); 

  try{
  const response =  await spotifyApi.searchTracks(req.body.q); 
  res.send(response.body);
}catch(err){
 console.log(err);
}

})
module.exports = router;
