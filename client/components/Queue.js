import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Card, Feed, Image} from 'semantic-ui-react';
import {QueueElement} from './QueueElement';
import {fetchQueues} from '../store/queue';
import socket from '../socket';

//props that should be passed here should be the current rooms listeners array
class UnconnectedQueue extends Component {
  sortArray = () => {
    // if (this.props.room.isDemocratic) {
    this.props.queue.sort((a, b) => {
      return b.votes - a.votes;
    });
    // } else {
    //   this.props.queue.sort((a, b) => {
    //     return a.createdAt - b.createdAt;
    //   });
    // }

    socket.on('new_queue', async roomId => {
      if ((roomId = this.props.room.id)) {
        await this.props.getQueues(this.props.roomId);
      }
    });
  };

  async componentDidMount() {
    await this.props.getQueues(this.props.roomId);
  }

  render() {
    this.props.queue.sort((a, b) => {
      return b.votes - a.votes;
    });
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>Queue</Card.Header>
          </Card.Content>
          <Feed>
            {this.props.queue.length ? (
              this.props.queue.map(item => {
                return (
                  <Card.Content>
                    <Feed.Event>
                      <Feed.Content>
                        <QueueElement
                          key={item.id}
                          sortFunc={this.sortArray}
                          item={item}
                          roomId={this.props.roomId}
                        />
                      </Feed.Content>
                    </Feed.Event>
                  </Card.Content>
                );
              })
            ) : (
              <p>Queue is empty!</p>
            )}
          </Feed>
        </Card>
      </div>
    );
  }
}

function mapState(state) {
  return {
    queue: state.queue,
    room: state.room
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
