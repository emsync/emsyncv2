import React from 'react';
import {Grid, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import RoomSingleCard from './roomSingleCard';

export const RoomsList = props => {
  console.log('ROOMSLIST ROOMS: ', props.rooms);
  return (
    <Grid columns="three" divided>
      <Grid.Row>
        {props.rooms.map(room => {
          return (
            <Grid.Column key={room.id}>
              <RoomSingleCard room={room} key={room.id} />
            </Grid.Column>
          );
        })}
      </Grid.Row>
    </Grid>
  );
};
