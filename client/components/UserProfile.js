import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Header} from 'semantic-ui-react';
import RoomSingleCard from './roomSingleCard';
import {RoomsList} from './RoomsList';
import {fetchRooms} from '../store/rooms';
import {Icon, Label} from 'semantic-ui-react';
class UnconnectedUserProfile extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchRooms();
  }
  render() {
    return (
      this.props.rooms && (
        <div>
          <Header as="h1" icon textAlign="center">
            {this.props.user.name}
            <br />
            <Image centered src={this.props.user.imageUrl} circular />
          </Header>
          <Header as="h2" icon textAlign="center">
            <Label>
              <Icon name="thumbs up outline" /> 23
            </Label>
            <Label>
              <Icon name="thumbs down outline" /> 23
            </Label>
          </Header>
          <Header as="h2" textAlign="center">
            Your rooms:
          </Header>
          <RoomsList rooms={this.props.rooms} user={this.props.user} />
        </div>
      )
    );
  }
}

const mapState = state => {
  const rooms = state.rooms.filter(room => {
    console.log(room.createdBy);
    console.log(state.user.id);
    return room.createdBy === state.user.id;
  });

  console.log(rooms);
  return {
    user: state.user,
    rooms
  };
};

const mapDispatch = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms())
});

export const UserProfile = connect(mapState, mapDispatch)(
  UnconnectedUserProfile
);
