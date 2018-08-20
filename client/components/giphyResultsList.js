import React from 'react';
import propTypes from 'prop-types';
import {Card} from 'semantic-ui-react';

//all clickcable elements thrown by the spotify search before this.
//Room id should come from props

export const GiphyResultsList = props => {
  console.log('results are', props.results);
  return props.results ? (
    <Card.Group itemsPerRow={5}>
      {props.results.map(gif => {
        return (
          <Card color="pink" key={gif.id}>
            <img src={gif.images.fixed_height_small.url} />
          </Card>
        );
      })}
    </Card.Group>
  ) : (
    <p>Loading...</p>
  );
};
