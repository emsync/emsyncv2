import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Icon, Button, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import socket from '../socket';

const Extra = props => {
  return (
    <div>
      <Icon name="user" />
      {props.listeners} Listeners
      <Link to={`/rooms/${props.id}`}>
        <Button content="Join" icon="right arrow" labelPosition="right" />
      </Link>
    </div>
  );
};

//really want to implement a dimmer here (see semantic ui)

const RoomSingleCard = props => {
  return props.room ? (
    <Card centered="true" raised={true}>
      <Image
        src={props.room.imageUrl}
        size="small"
        verticalAlign="middle"
        centered={true}
      />
      {/* <img
        src={props.room.imageUrl}
        alt="room image"
        height={225}
        width={225}
      /> */}
      <Card.Content>
        <Card.Header>{props.room.name}</Card.Header>
        <Card.Description>{props.room.description}</Card.Description>
        <Card.Content extra>
          {props.room.users ? (
            <Extra listeners={props.room.users.length} id={props.room.id} />
          ) : (
            <Extra listeners={0} id={props.room.id} />
          )}
        </Card.Content>
      </Card.Content>
    </Card>
  ) : (
    <p>Loading</p>
  );
};

export default RoomSingleCard;
