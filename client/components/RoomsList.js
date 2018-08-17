import React from 'react';
import {Grid, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import RoomSingleCard from './roomSingleCard';

export const RoomsList = props => {
  return (
    <Grid container columns="three">
      {props.rooms.map(room => {
        return (
          <Grid.Column key={room.id}>
            <RoomSingleCard room={room} user={props.user} key={room.id} />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};
