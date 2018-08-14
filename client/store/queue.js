import axios from 'axios'

const ADD_QUEUE = 'ADD_QUEUE'
const REMOVE_QUEUE = 'REMOVE_QUEUE'

//ACTION CREATORS
const addQueue = queue => {
  return {type: ADD_QUEUE, queue}
}
const removeQueue = queue => ({type: REMOVE_QUEUE, queue})

//THUNK CREATORS
export const removeFromQueue = (item, id) => async dispatch => {
  const res = await axios.put(`api/queues/${id}`, {item, remove: true})
  dispatch(removeQueue(res.data))
}

//i like the idea of a queue item being a class

export const addToQueue = (item, id) => async dispatch => {
  const res = await axios.put(`api/queues/${id}`, {item, remove: false})
  dispatch(addQueue(res.data))
}

export default function(state = [], action) {
  switch (action.type) {
    case ADD_QUEUE:
      return action.queue
    case REMOVE_QUEUE:
      return action.queue
    default:
      return state
  }
}

//will work on this once the DB is made for the queue
