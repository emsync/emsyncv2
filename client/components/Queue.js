import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Card, Feed, Image} from 'semantic-ui-react';
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
    return (
      <div>
        {this.props.queue.length ? (
          <Card>
            <Card.Content>
              <Card.Header>Queue</Card.Header>
            </Card.Content>
            <Card.Content>
              <Feed>
                <Feed.Event>
                  <Feed.Content>
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
                  </Feed.Content>
                </Feed.Event>
              </Feed>
            </Card.Content>
          </Card>
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
