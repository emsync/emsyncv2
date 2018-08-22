import React from 'react';
import propTypes from 'prop-types';
import {Card, Button, Image} from 'semantic-ui-react';

//all clickcable elements thrown by the spotify search before this.
//Room id should come from props

export const GiphyResultsList = props => {
  return props.results ? (
    <Card.Group itemsPerRow={5}>
      {props.results.map(gif => {
        return (

          <Card
            color="pink"
            key={gif.id}
            onClick={() =>
              { props.clicker(gif.images.fixed_height.url)}}
            raised={true}
          >

            <Image src={gif.images.fixed_height.url} />
          </Card>
        );
      })}
    </Card.Group>
  ) : (
    <p>Loading...</p>
  );
};
