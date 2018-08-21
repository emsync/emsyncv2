import axios from 'axios';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const refreshToken = timeSinceRefresh => ({
  type: REFRESH_TOKEN,
  timeSinceRefresh
});

export const goRefreshToken = userId => async dispatch => {
  try {
    const timeSinceRefresh = await axios.get(`/api/user/elapsedtime/${userId}`);
    let rtoken = await axios.put(`/api/spotify/refreshToken/${userId}`);
    console.log(`timeSinceRefresh is ${timeSinceRefresh}`);
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
