import React from 'react';
import propTypes from 'prop-types';
import {Card, Button, Image} from 'semantic-ui-react';

//all clickcable elements thrown by the spotify search before this.
//Room id should come from props

export const GiphyResultsList = props => {
  console.log('results are', props.results);
  return props.results ? (
    <Card.Group itemsPerRow={5}>
      {props.results.map(gif => {
        return (
          <Card
            color="pink"
            key={gif.id}
            onClick={props.clicker}
            content={gif.images.fixed_height_small.url}
            raised={true}
          >
            <Image src={gif.images.fixed_height_small.url} />
          </Card>
        );
      })}
    </Card.Group>
  ) : (
    <p>Loading...</p>
  );
};
