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
  constructor() {
    super();
    this.state = {
      active: false
    };
  }

  async componentDidMount() {
    await this.props.fetchRooms();
    this.setState({
      active: true
    });
  }
  render() {
    return (
      this.props.rooms.length && (
        <div className="pageContainer">
          <Header
            as="h1"
            textAlign="center"
            className="title"
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
