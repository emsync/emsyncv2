import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Icon, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import socket from '../socket';

const Extra = props => {
  return (
    <div>
      <Icon name="user" />
      {props.listeners} Listeners
      <Link to={`/rooms/${props.id}`}>
        <Button
          content="Join"
          icon="right arrow"
          labelPosition="right"
          onClick={() => socket.emit(`joined`, props.user, props.id)}
        />
      </Link>
    </div>
  );
};

const RoomSingleCard = props => {
  console.log('PROPS', props);
  return (
    <Card
    //   image={props.room.imageUrl}
    //   header={props.room.name}
    //   meta="Room"e
    //   description={props.room.description}
    //   extra={<Extra listeners={props.room.users.length} id={props.room.id} />}
    >
      <img
        src={props.room.imageUrl}
        alt="room image"
        height={225}
        width={225}
      />
      <Card.Content>
        <Card.Header>{props.room.name}</Card.Header>
        <Card.Meta>"Room"</Card.Meta>
        <Card.Description>{props.room.description}</Card.Description>
        <Card.Content extra>
          {
            <Extra
              listeners={props.room.users.length}
              id={props.room.id}
              user={props.user}
            />
          }
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default RoomSingleCard;
