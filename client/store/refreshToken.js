import axios from 'axios';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const refreshToken = timeSinceRefresh => ({
  type: REFRESH_TOKEN,
  timeSinceRefresh
});

export const goRefreshToken = userId => async dispatch => {
  try {
    const response = await axios.get(`/api/user/elapsedtime/${userId}`);
    // console.log(response.data.time);
    let timeSinceRefresh = Number(response.data.time);
    if (timeSinceRefresh > 30) {
      // console.log('getting a new token');
      await axios.put(`/api/spotify/refreshToken/${userId}`);
      dispatch(refreshToken(timeSinceRefresh));
    }
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
