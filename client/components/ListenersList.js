import React from 'react';
import {List, Image, Card, Feed} from 'semantic-ui-react';
import {ListenerElement} from './ListenerElement';

//props that should be passed here should be the current rooms listeners array
const ListenersList = props => (
  <div>
    {props.listeners.length ? (
      <Card>
        <Card.Content>
          <Card.Header>Listeners</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                {props.listeners.map(listener => {
                  return <ListenerElement key={listener} listener={listener} />;
                })}
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    ) : (
      <p>You're the only listener!</p>
    )}
  </div>
);

export default ListenersList;
