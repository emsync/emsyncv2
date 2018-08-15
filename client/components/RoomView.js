import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListenersList from './ListenersList';
import {fetchRoom} from '../store/room';
import {addToQueue} from '../store/queue';
import {Queue} from './Queue';
import socket from '../socket';
import {List, Image} from 'semantic-ui-react';
import {ListenerElement} from './ListenerElement';

class RoomView extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      listeners: []
    };

    socket.on('joined', (user, room, listenerList) => {
      if (room === this.props.room.id) {
        console.log('we have a match!', listenerList);
        this.setState({listeners: listenerList});
      }
    });
  }

  async componentDidMount() {
    await this.props.fetchRoom();
  }

  handleClick() {
    console.log('clicked!');
    this.props.addToQueue({name: 'Baby', artist: 'Justin Biebser'});
  }

  render() {
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
            <button onClick={this.handleClick}>Add to queue!</button>
          </div>
          <div className="rightRoom">
            <div>
              <h2>Listeners:</h2>
              {this.state.listeners.length ? (
                <List>
                  <List.Item>
                    {this.state.listeners.map(listener => {
                      return (
                        <ListenerElement
                          key={listener.id}
                          listener={listener}
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
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchRoom: () => dispatch(fetchRoom(ownProps.match.params.id)),
  addToQueue: song => dispatch(addToQueue(song, ownProps.match.params.id))
  //will probably have to find the queue using the room id
});

const mapState = (state, ownProps) => {
  return {
    room: state.room
  };
};

export default connect(mapState, mapDispatch)(RoomView);
