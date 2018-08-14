import axios from 'axios';

const ADD_QUEUE = 'ADD_QUEUE';
const REMOVE_QUEUE = 'REMOVE_QUEUE';
const UPDATE_VOTES = 'UPDATE_VOTES';

//ACTION CREATORS
const addQueue = item => {
  return {type: ADD_QUEUE, item};
};
const removeQueue = id => ({type: REMOVE_QUEUE, id});

const updateVotes = queueItem => ({type: UPDATE_VOTES, queueItem});

//THUNK CREATORS
export const removeFromQueue = (item, itemId) => async dispatch => {
  const res = await axios.delete(`api/queues/${itemId}`, {item});
  dispatch(removeQueue(itemId));
};

//i like the idea of a queue item being a class

export const addToQueue = item => async dispatch => {
  const res = await axios.put(`api/queues/`, {item});
  dispatch(addQueue(res.data));
};

export const updateVote = (itemId, votes) => async dispatch => {
  const res = await axios.put(`/${itemId}`, votes);
  dispatch(updateVotes(res.data));
};

export default function(state = [], action) {
  switch (action.type) {
    case ADD_QUEUE:
      return [...state, action.item];
    case REMOVE_QUEUE:
      let copyQueue = state.slice();
      let finalQueue = copyQueue.filter(item => {
        return item.id !== action.id;
      });
      return finalQueue;
    case UPDATE_VOTES:
      copyQueue = [...state];
      finalQueue = copyQueue.filter(item => {
        return item.id !== action.id;
      });
      finalQueue.push(action.queueItem);
      return finalQueue;
    default:
      return state;
  }
}

//will work on this once the DB is made for the queue
