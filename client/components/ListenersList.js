import React from 'react';
import {List, Image, Card, Feed} from 'semantic-ui-react';
import {ListenerElement} from './ListenerElement';

//props that should be passed here should be the current rooms listeners array
const ListenersList = props => (
  <div>
    <Card>
      <Card.Content>
        <Card.Header>Listeners</Card.Header>
      </Card.Content>
      <Card.Content>
        <Feed>
          {props.listeners.length ? (
            props.listeners.map(listener => {
              return (
                <Card.Content>
                  <Feed.Event>
                    <Feed.Content>
                      <ListenerElement key={listener} listener={listener} />
                    </Feed.Content>
                  </Feed.Event>
                </Card.Content>
              );
            })
          ) : (
            <Feed.Event>
              <Feed.Content>You're the only listener!</Feed.Content>
            </Feed.Event>
          )}
        </Feed>
      </Card.Content>
    </Card>
  </div>
);

export default ListenersList;
