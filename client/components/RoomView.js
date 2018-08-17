import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListenersList from './ListenersList';
import {fetchRoom} from '../store/room';
import {addToQueue, fetchQueues} from '../store/queue';
import {Queue} from './Queue';
import socket from '../socket';
import {List, Image} from 'semantic-ui-react';
import {ListenerElement} from './ListenerElement';
import SearchForm from './SearchForm';
import SpotifyWebPlayer from './SpotifyWebPlayer';

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

  async componentDidMount() {
    await this.props.fetchRoom();
    await this.props.fetchQueues(this.props.room.id);
  }

  componentWillUnmount() {
    socket.emit('left', this.props.user, this.props.match.params.id);
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
            <ListenersList listeners={this.state.listeners} />
          </div>
          <div>
            <SearchForm />
          </div>
          <div>
            <SpotifyWebPlayer />
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchRoom: () => dispatch(fetchRoom(ownProps.match.params.id)),
  addToQueue: song => dispatch(addToQueue(song, ownProps.match.params.id)),
  fetchQueues: roomId => dispatch(fetchQueues(roomId))
});

const mapState = (state, ownProps) => {
  return {
    room: state.room,
    user: state.user
  };
};

export default connect(mapState, mapDispatch)(RoomView);
