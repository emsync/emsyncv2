import axios from 'axios';

const ADD_QUEUE = 'ADD_QUEUE';
const REMOVE_QUEUE = 'REMOVE_QUEUE';
const UPDATE_VOTES = 'UPDATE_VOTES';
const FETCH_QUEUE = 'FETCH_QUEUE';
const PLAY_SONG = 'PLAY_SONG';
const SORT = SORT;

//ACTION CREATORS
const addQueue = item => {
  return {type: ADD_QUEUE, item};
};

export const fetchQueue = queue => {
  return {type: FETCH_QUEUE, queue};
};
const removeQueue = id => ({type: REMOVE_QUEUE, id});
const updateVotes = queueItem => ({type: UPDATE_VOTES, queueItem});
const playSong = queueItem => ({type: PLAY_SONG, queueItem});

//THUNK CREATORS
export const playSongs = queueItem => async dispatch => {
  const res = await axios.put(`/api/queues/${queueItem.id}`, {
    duration: queueItem.duration,
    startTimeStamp: queueItem.startTimeStamp,
    isPlaying: true
  });
};
export const removeFromQueue = itemId => async dispatch => {
  const res = await axios.delete(`/api/queues/${itemId}`);
  dispatch(removeQueue(itemId));
};

//i like the idea of a queue item being a class

export const addToQueue = item => async dispatch => {
  // console.log('add to queue item should be', item.item.roomId);
  const res = await axios.put(`/api/queues`, item);
};

export const updateVote = (itemId, votes) => async dispatch => {
  const res = await axios.put(`/api/queues/${itemId}`, votes);
  await res;
  // console.log('update votes complete');
};

export const fetchQueues = roomId => async dispatch => {
  // console.log('fetch queue requested for room', roomId);
  const res = await axios.get(`/api/queues/${roomId}`);
  const queue = res.data;
  dispatch(fetchQueue(queue));
};

export default function(state = [], action) {
  switch (action.type) {
    case ADD_QUEUE:
    // return [...state, action.item];
    case REMOVE_QUEUE:
      let copyQueue = state.slice();
      let finalQueue = copyQueue.filter(item => {
        return item.id !== action.id;
      });
      return finalQueue;
    case UPDATE_VOTES:
    // let copiedQueue = [...state];
    // let finaleQueue = copiedQueue.filter(item => {
    //   return item.id !== action.queueItem.id;
    // });
    // finaleQueue.push(action.queueItem);
    // return finaleQueue;
    case PLAY_SONG:
    // return [...state];
    case FETCH_QUEUE:
      return action.queue;
    default:
      return state;
  }
}

//will work on this once the DB is made for the queue
