import io from 'socket.io-client';
import {newListener} from './store';
import {connect} from 'react-redux';

const socket = io(window.location.origin);

socket.on('connect', () => {
  console.log('Connected!');
});

// socket.on('joined', (user, room) => {
//   console.log(user.name, ' has joined room #', room);
//   socket.join(room);
// });

// const mapDispatch = dispatch => {
//   return {
//     addListener: user => {
//       dispatch(addListener(newListener(user)));
//     }
//   };
// };

export default socket;
