import React, {Component} from 'react';
import {List, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchUser} from '../store/user';
//props being passed here should just be a single listener (user) object
export const ListenerElement = props => {
  return (
    <div>
      <Image avatar src={props.listener.imageUrl} />
      <List.Content>
        <List.Header as="a">{props.listener}</List.Header>
      </List.Content>
    </div>
  );
};
