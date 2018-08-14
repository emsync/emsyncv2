import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Image} from 'semantic-ui-react';
import {QueueElement} from './QueueElement';
import {fetchQueues} from '../store/queue';

//props that should be passed here should be the current rooms listeners array
class UnconnectedQueue extends Component {
  sortArray = () => {
    this.props.queue.sort((a, b) => {
      return b.votes - a.votes;
    });
  };

  async componentDidMount() {
    await this.props.getQueues(this.props.roomId);
  }

  render() {
    this.props.queue.sort((a, b) => {
      return b.votes - a.votes;
    });
    console.log('QUEUE PROPS: ', this.props);
    return (
      <div>
        <h2>Queue:</h2>
        {this.props.queue.length ? (
          <List>
            <List.Item>
              {this.props.queue.map(item => {
                return (
                  <QueueElement
                    key={item.id}
                    sortFunc={this.sortArray}
                    item={item}
                    roomId={this.props.roomId}
                  />
                );
              })}
            </List.Item>
          </List>
        ) : (
          <div>
            <p>Queue is empty!</p>
          </div>
        )}
      </div>
    );
  }
}

function mapState(state) {
  return {
    queue: state.queue
  };
}

function mapDispatch(dispatch, ownProps) {
  return {
    getQueues: roomId => {
      dispatch(fetchQueues(roomId));
    }
  };
}

export const Queue = connect(mapState, mapDispatch)(UnconnectedQueue);
