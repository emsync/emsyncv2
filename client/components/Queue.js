import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Card, Feed, Image} from 'semantic-ui-react';
import {QueueElement} from './QueueElement';
import {fetchQueues, fetchQueue} from '../store/queue';
import socket from '../socket';

//props that should be passed here should be the current rooms listeners array
class UnconnectedQueue extends Component {
  constructor() {
    super();
    socket.on('new_queue', async roomId => {
      if ((roomId = this.props.room.id)) {
        await this.props.getQueues(this.props.roomId);
      }
    });
  }
  sortArray = async () => {
    const copyArray = await this.props.queue.slice();
    console.log('copy array', copyArray);
    // if (this.props.room.isDemocratic) {
    const nowPlaying = await copyArray.shift();
    console.log('copy array', nowPlaying, copyArray);
    const savedArray = await copyArray.sort(async (a, b) => {
      if (this.props.room.isDemocratic) {
        if (b.votes !== a.votes) {
          return b.votes - a.votes;
        } else {
          const dB = await new Date(b.createdAt);
          const dA = await new Date(a.createdAt);
          const timeB = dB.getTime();
          const timeA = dA.getTime();
          return timeB - timeA;
        }
      } else {
        const dB = await new Date(b.createdAt);
        const dA = await new Date(a.createdAt);
        const timeB = dB.getTime();
        const timeA = dA.getTime();
        return timeB - timeA;
      }
    });
    console.log('saved array', savedArray);
    await savedArray.unshift(nowPlaying);
    console.log('saved array', savedArray);
    await this.props.fetchQueues(savedArray);

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
    if (this.props.queue.length) {
      // this.sortArray();
    }
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
    getQueues: roomId => {
      dispatch(fetchQueues(roomId));
    },
    fetchQueues: queue => {
      dispatch(fetchQueue(queue));
    }
  };
}

export const Queue = connect(mapState, mapDispatch)(UnconnectedQueue);
