import React from 'react';
import {Grid, Image, Card} from 'semantic-ui-react';
import {connect} from 'react-redux';
import RoomSingleCard from './roomSingleCard';

export const RoomsList = props => {
  return (
    <Card.Group
      // doubling="true"
      itemsPerRow="5"
      // stackable="true"
      // centered="true"
    >
      {props.rooms.map(room => {
        return (
          // <Grid.Column key={room.id}>
          <RoomSingleCard room={room} user={props.user} key={room.id} />
          // </Grid.Column>
        );
      })}
    </Card.Group>
  );
};
