import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListenersList from './ListenersList';
import {fetchRoom} from '../store/room';
import {addToQueue} from '../store/queue';
import {Queue} from './Queue';
class RoomView extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
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
          <div className="rightRoom">
            <ListenersList listeners={this.props.room.users} />
          </div>
          <div className="leftRoom">
            {this.props.room.queueItems.length ? (
              <Queue
                queue={this.props.room.queueItems}
                roomId={this.props.match.params.id}
              />
            ) : null}
            <button onClick={this.handleClick}>Add to queue!</button>
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
