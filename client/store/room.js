import axios from 'axios'
const GET_ROOM = 'GET_ROOM'

const ADD_LISTENER = 'ADD_LISTENER'
const REMOVE_LISTENER = 'REMOVE_LISTENER'

const getRoom = room => ({type: GET_ROOM, room})

const addListener = listener => ({type: ADD_LISTENER, listener})
const removeListener = listener => ({type: REMOVE_LISTENER, listener})

// const currentState = store.getState();
// const currentRoom = currentState.room;

//THUNK CREATORS
export const fetchRoom = id => async dispatch => {
  const response = await axios.get(`/api/rooms/${id}`)
  const room = response.data
  dispatch(getRoom(room))
}

export const newListener = (userId, roomId) => async dispatch => {
  const response = await axios.get(`/api/rooms/${roomId}`)
  const room = response.data
  const listeners = room.listeners
  const updatedListeners = listeners.push(userId)

  const res = await axios.put(`api/rooms/${roomId}/listeners`, updatedListeners)
  dispatch(addListener(res.data))
}

export const departingListener = (userId, roomId) => async dispatch => {
  const response = await axios.get(`/api/rooms/${roomId}`)
  const room = response.data
  const listeners = room.listeners
  const updatedListeners = listeners.filter(elem => {
    return elem !== userId
  })
  const res = await axios.put(`api/rooms/${roomId}/listeners`, updatedListeners)
  dispatch(removeListener(res.data))
}
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ROOM:
      return action.room
    case ADD_LISTENER:
      return action.room
    case REMOVE_LISTENER:
      return action.room
    default:
      return state
  }
}

//the issue I am prematurely foreseeing here is that by doing this based on the name, rather than a generated id like we'd have with sequelize, is that once you create a rooms name it 1) must be unique 2) cannot be updated ..... but thats a problem for later
