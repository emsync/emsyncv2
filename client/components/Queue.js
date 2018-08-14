import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Image} from 'semantic-ui-react';
import {QueueElement} from './QueueElement';

//props that should be passed here should be the current rooms listeners array
class UnconnectedQueue extends Component {
  sortArray = () => {
    this.props.queue.sort((a, b) => {
      return a.votes - b.votes;
    });
  };
  render() {
    return (
      <div>
        <h2>Queue:</h2>
        props.queue.length ? (
        <List>
          <List.Item>
            {props.queue.map(item => {
              return <QueueElement sortFunc={this.sortArray} item={item} />;
            })}
          </List.Item>
        </List>) : (<div>
          <p>Queue is empty!</p>
        </div>)
      </div>
    );
  }
}

function mapState(state) {
  return {
    queue: state.queue
  };
}

export const Queue = connect(mapState, null)(UnconnectedQueue);
