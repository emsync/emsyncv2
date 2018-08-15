import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, Header} from 'semantic-ui-react';
import {RoomSingleCard} from './roomSingleCard';
class UnconnectedUserProfile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Header as="h2" icon textAlign="center">
        <Image
          centered
          size="large"
          src="https://react.semantic-ui.com/images/wireframe/centered-paragraph.png"
          circular
        />
        <Header.Content>{this.props.user.name}</Header.Content>
        {this.props.rooms.map(room => {
          return <RoomSingleCard key={room.id} room={room} />;
        })}
      </Header>
    );
  }
}

const mapState = state => ({
  user: state.user,
  rooms: state.user.rooms
});

export const UserProfile = connect(mapState)(UnconnectedUserProfile);
