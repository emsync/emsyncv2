import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Card, Feed, Image} from 'semantic-ui-react';
import {QueueElement} from './QueueElement';
import {fetchQueues, fetchQueue} from '../store/queue';
import socket from '../socket';

//props that should be passed here should be the current rooms listeners array
class UnconnectedQueue extends Component {
  constructor(props) {
    super(props);
    socket.on('new_queue', async roomId => {
      if ((roomId = this.props.room.id)) {
        console.log('fetching new queue');
        await this.props.getQueues(this.props.roomId);
      }
    });
  }

  async componentDidMount() {
    await this.props.getQueues(this.props.roomId);
    console.log('props in cdm?', this.props);
  }

  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Card.Header>Queue</Card.Header>
          </Card.Content>
          <Feed>
            {this.props.queue.length ? (
              this.props.queue.map(item => {
                if (item) {
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
                }
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
    getQueues: async roomId => {
      dispatch(fetchQueues(roomId));
    }
  };
}

export const Queue = connect(mapState, mapDispatch)(UnconnectedQueue);
