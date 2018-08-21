import axios from 'axios';
const ADD_ROOM = 'ADD_ROOM';
const REMOVE_ROOM = 'REMOVE_ROOM';
const GET_ROOMS = 'GET_ROOMS';

const getRooms = rooms => ({type: GET_ROOMS, rooms});
const removeRoom = room => ({type: REMOVE_ROOM, room});
const addRoom = room => {
  return {type: ADD_ROOM, room};
};

export const fetchRooms = () => async dispatch => {
  const response = await axios.get('/api/rooms');
  const rooms = response.data;
  dispatch(getRooms(rooms));
};

export const deleteRoom = id => async dispatch => {
  const response = await axios.delete(`/api/rooms/${id}`);
  const room = response.data;
  dispatch(removeRoom(id));
};

export const createRoom = room => async dispatch => {
  // console.log('ROOM IN REDUCER IS', room);
  const response = await axios.put(`/api/rooms`, room);
  const newRoom = response.data;
  dispatch(addRoom(newRoom));
};

export default function(state = [], action) {
  switch (action.type) {
    case ADD_ROOM:
      return [...state, action.room];
    case REMOVE_ROOM:
      let roomsCopy = state.slice();
      let roomsRemoved = roomsCopy.filter(room => {
        return room.id !== action.id;
      });
      return roomsRemoved;
    case GET_ROOMS:
      return action.rooms;
    default:
      return state;
  }
}
