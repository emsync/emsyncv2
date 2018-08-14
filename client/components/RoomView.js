import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ListenersList from './ListenersList';
import {fetchRoom} from '../store/room';
import {addToQueue} from '../store/queue';
import Queue from './Queue';
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
    console.log(this.props);
    return this.props.room.name ? (
      <div>
        <h1>{this.props.room.name}</h1>
        <ListenersList listeners={this.props.room.users} />
        {/* <Queue queue={this.props.room.queue} /> */}
        <button onClick={this.handleClick}>Add to queue!</button>
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
  console.log('State is', state);
  return {
    room: state.room
  };
};

export default connect(mapState, mapDispatch)(RoomView);