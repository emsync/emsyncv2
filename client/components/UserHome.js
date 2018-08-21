import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {RoomsList} from './RoomsList';
import {fetchRooms} from '../store/rooms';
import {Header} from 'semantic-ui-react';

/**
 * COMPONENT
 */
export class UserHome extends Component {
  async componentDidMount() {
    await this.props.fetchRooms();
  }
  render() {
    return (
      this.props.rooms.length && (
        <div>
          <Header
            as="h1"
            textAlign="center"
            style={{marginTop: 30, fontSize: 45}}
          >
            Active Rooms
          </Header>
          <RoomsList rooms={this.props.rooms} user={this.props.user} />
        </div>
      )
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  // console.log('STORED STATE: ', state);
  return {
    user: state.user,
    email: state.user.email,
    rooms: state.rooms
  };
};

const mapDispatch = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms())
});

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
