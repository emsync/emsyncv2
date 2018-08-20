import axios from 'axios';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const refreshToken = timeSinceRefresh => ({
  type: REFRESH_TOKEN,
  timeSinceRefresh
});

export const goRefreshToken = () => async dispatch => {
  try {
    let rtoken = await axios.put('/api/spotify/refreshToken');
    const timeSinceRefresh = await axios.get('/api/user/elapsedtime');
    console.log('got refresh token');
    console.log('in REFRESH TOKEN, TIME TO UPATE!');
    dispatch(refreshToken(timeSinceRefresh));
  } catch (err) {
    console.log(err);
  }
};

export default (state, action) => {
  switch (action.type) {
    case REFRESH_TOKEN:
      return refreshToken;
    default:
      return state;
  }
};
