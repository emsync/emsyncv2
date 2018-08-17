import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListenersList from './ListenersList';
import {fetchRoom} from '../store/room';
import {addToQueue, fetchQueues} from '../store/queue';
import {Queue} from './Queue';
import SearchForm from './SearchForm';
import {Player} from './index';

class RoomView extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchRoom();
    await this.props.fetchQueues(this.props.room.id);
  }

  handleClick() {
    // console.log('clicked!');
    this.props.addToQueue({name: 'Baby', artist: 'Justin Biebser'});
  }

  render() {
    return this.props.room.name ? (
      <div>
        <h1 style={{textAlign: 'center'}}>{this.props.room.name}</h1>
        <div className="room">
          <div className="leftRoom">
            <Player />
            {this.props.room.queueItems.length ? (
              <Queue
                queue={this.props.room.queueItems}
                roomId={this.props.match.params.id}
              />
            ) : null}
          </div>
          <div className="rightRoom">
            <ListenersList listeners={this.props.room.users} />
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
  fetchRoom: () => dispatch(fetchRoom(ownProps.match.params.id)),
  addToQueue: song => dispatch(addToQueue(song, ownProps.match.params.id)),
  fetchQueues: roomId => dispatch(fetchQueues(roomId))
});

const mapState = (state, ownProps) => {
  return {
    room: state.room
  };
};

export default connect(mapState, mapDispatch)(RoomView);
