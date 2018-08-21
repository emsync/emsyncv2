import React, {Component} from 'react';
import {List, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchUser} from '../store/user';
import {Link} from 'react-router-dom';

//props being passed here should just be a single listener (user) object
export const ListenerElement = props => {
  console.log('listener is', props.listener);
  return (
    <div>
      <Image avatar src={props.listener.imageUrl} />
      <List.Content>
        <Link to={`/user/${props.listener.id}`}>
          <List.Header>{props.listener.name}</List.Header>
        </Link>
      </List.Content>
    </div>
  );
};
