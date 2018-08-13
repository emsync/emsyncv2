import React from "react";
import { List, Image } from "semantic-ui-react";
import { QueueElement } from "./QueueElement";

//props that should be passed here should be the current rooms listeners array
const Queue = props => (
  <div>
    <h2>Up next:</h2>
    <List>
      <List.Item>
        {props.queue.map(song => {
          return <QueueElement key={song.id} song={song} />;
        })}
      </List.Item>
    </List>
  </div>
);

export default Queue;
