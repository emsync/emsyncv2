import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListenersList from './ListenersList';
import {fetchRoom} from '../store/room';
import {addToQueue, fetchQueues} from '../store/queue';
import {Queue} from './Queue';
<<<<<<< HEAD
import socket from '../socket';
import {List, Image} from 'semantic-ui-react';
import {ListenerElement} from './ListenerElement';
=======
import SearchForm from './SearchForm';
>>>>>>> master

class RoomView extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      listeners: []
    };
    socket.on('update-listeners', (room, listenerList) => {
      // console.log('we have an update', room, this.props.room.id);
      if (room == this.props.room.id) {
        const userNames = [];
        for (let i = 0; i < listenerList.length; i++) {
          userNames.push(listenerList[i].name);
        }
        // console.log('we have a match!', listenerList);
        this.setState({listeners: userNames});
      }
    });
  }

  async componentWillMount() {}

  async componentDidMount() {
    await this.props.fetchRoom();
    await this.props.fetchQueues(this.props.room.id);
  }

  handleClick() {
    // console.log('clicked!');
    this.props.addToQueue({name: 'Baby', artist: 'Justin Biebser'});
  }

  render() {
    let present = false;

    if (this.props.user) {
      for (let i = 0; i < this.state.listeners.length; i++) {
        if (this.state.listeners[i] === this.props.user.name) {
          console.log(
            'comparison',
            this.state.listeners[i],
            this.props.user.name
          );
          present = true;
        }
      }
    }

    if (this.props.user.name && !present) {
      // console.log('emitting joined command');
      socket.emit('joined', this.props.user, this.props.match.params.id);
    }
    return this.props.room.name ? (
      <div>
        <h1 style={{textAlign: 'center'}}>{this.props.room.name}</h1>
        <div className="room">
          <div className="leftRoom">
            {this.props.room.queueItems.length ? (
              <Queue
                queue={this.props.room.queueItems}
                roomId={this.props.match.params.id}
              />
            ) : null}
          </div>
          <div className="rightRoom">
            <div>
              <h2>Listeners:</h2>
              {this.state.listeners.length > 0 ? (
                <List>
                  <List.Item>
                    {this.state.listeners.map(userListening => {
                      return (
                        <ListenerElement
                          key={userListening.id}
                          listener={userListening}
                        />
                      );
                    })}
                  </List.Item>
                </List>
              ) : (
                <p>You're the only listener!</p>
              )}
            </div>
          </div>
          <div>
            <SearchForm />
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => ({
<<<<<<< HEAD
  fetchRoom: () => {
    dispatch(fetchRoom(ownProps.match.params.id));
  },
  addToQueue: song => dispatch(addToQueue(song, ownProps.match.params.id))
  //will probably have to find the queue using the room id
=======
  fetchRoom: () => dispatch(fetchRoom(ownProps.match.params.id)),
  addToQueue: song => dispatch(addToQueue(song, ownProps.match.params.id)),
  fetchQueues: roomId => dispatch(fetchQueues(roomId))
>>>>>>> master
});

const mapState = (state, ownProps) => {
  return {
    room: state.room,
    user: state.user
  };
};

export default connect(mapState, mapDispatch)(RoomView);
