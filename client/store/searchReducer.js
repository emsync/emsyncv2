import axios from 'axios'
import { runInNewContext } from 'vm';

const initialState = {
    searchResults: null
}

const GOT_SEARCH_RESULTS = 'GOT_SEARCH_RESULTS';

const gotSearchResults = (spotifyResults) => ({type: GOT_SEARCH_RESULTS, searchResults: spotifyResults});


//THUNKS

export const goSearch = searchParams => async dispatch => {

    console.log('hit goSearch. searchParams => ', searchParams);
    try{
        const {data} = await axios.post('/api/spotify', searchParams)
        console.log('response => ',data.tracks.items)
        dispatch(gotSearchResults(data));
        return data.tracks.items
    }catch(err){
        console.log(err);
    }

}


export default function searchReducer (state = initialState, action) {
    switch(action.type){
        case GOT_SEARCH_RESULTS:
        return {searchResults: action.searchResults.tracks.items}
        default:
        return state;
    }
}