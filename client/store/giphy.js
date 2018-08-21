import axios from 'axios';

const initialState = {
  results: null
};

const GOT_GIPHY_RESULTS = 'GOT_GIPHY_RESULTS';

const gotGiphyResults = results => ({
  type: GOT_GIPHY_RESULTS,
  results
});

//THUNKS

export const search = searchParams => async dispatch => {
  try {
    const {data} = await axios.post('/api/giphy', {q: searchParams});
    dispatch(gotGiphyResults(data));
  } catch (err) {
    console.log(err);
  }
};

export const getTrending = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/giphy/trending');
    dispatch(gotGiphyResults(data));
  } catch (err) {
    console.log(err);
  }
};

export default function giphy(state = initialState, action) {
  switch (action.type) {
    case GOT_GIPHY_RESULTS:
      return {results: action.results};
    default:
      return state;
  }
}
