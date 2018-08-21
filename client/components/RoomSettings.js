import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Icon, Button, Image, Feed} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import socket from '../socket';

//really want to implement a dimmer here (see semantic ui)

const RoomSettings = props => {
  return props.room ? (
    <Card centered="true" raised={true}>
      <Card.Content>
        <Card.Header>Settings</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <Icon name="edit outline" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Date content="Allow listeners to add to queue" />
                <Feed.Summary>
                  {props.room.allowAdd ? 'Allowed' : 'Blocked'}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label>
                <Icon name="heart outline" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Date content="Queue sorted by votes" />
                <Feed.Summary>
                  {props.room.isDemocratic ? 'True' : 'False'}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label>
                <Icon name="headphones" />
              </Feed.Label>
              <Feed.Content>
                <Feed.Date content="DJ" />
                <Feed.Summary>{props.user.name}</Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card.Content>
    </Card>
  ) : (
    <p>Loading</p>
  );
};

export default RoomSettings;
