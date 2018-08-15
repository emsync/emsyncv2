import React from 'react';
import {Grid, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import RoomSingleCard from './roomSingleCard';

export const RoomsList = props => {
  console.log('ROOMSLIST ROOMS: ', props.rooms);
  return (
    <Grid container columns="three">
      {props.rooms.map(room => {
        return (
          <Grid.Column>
            <RoomSingleCard room={room} />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};
