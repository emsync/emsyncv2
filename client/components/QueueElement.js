import React, {Component} from 'react';
import CardContent, {List, Image} from 'semantic-ui-react';
import {Button, Icon, Label, Card} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchUser} from '../store/user';
import {updateVote, addToQueue, removeFromQueue} from '../store/queue';
import socket from '../socket';

//props being passed here should just be a single listener (user) object
class UnconnectedQueueElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.comingFrom ? 0 : this.props.item.upVotes || 0,
      dislikes: this.props.comingFrom ? 0 : this.props.item.downVotes || 0,
      votes: this.props.comingFrom
        ? 0
        : this.props.item.upVotes - this.props.item.downVotes || 0,
      disabled: false,
      addedBy: this.props.comingFrom ? 'search' : this.props.item.userId,
      imageUrl: this.props.imageUrl || this.props.item.imageUrl,
      imagePlayerURL:
        this.props.imagePlayerURL || this.props.item.imagePlayerURL,
      spotifyLink: this.props.spotifyLink || this.props.item.spotifyLink,
      trackName: this.props.trackName || this.props.item.trackName,
      artistName: this.props.artistName || this.props.item.artistName,
      active: true
    };
    this.handleDislike = this.handleDislike.bind(this);
    this.handleLike = this.handleLike.bind(this);
    socket.on('new_queue', async queueId => {
      console.log(
        'should have updated',
        this.props.item.upVotes,
        this.props.item.downVotes
      );
      await this.setState({
        likes: this.props.item.upVotes,
        dislikes: this.props.item.downVotes
      });
      this.forceUpdate();
    });
  }

  // componentWillUpdate() {
  //   this.forceUpdate();
  // }

  handleClick = () => {
    console.log(
      'In QueueElement this.state.imagePlayerURL: ',
      this.state.imagePlayerURL
    );
    this.props.addQueue({
      // votes: this.state.likes - this.state.disklikes,
      addedBy: this.props.user.id,
      spotifyLink: this.state.spotifyLink,
      currentPlayingTime: 0,
      isPlaying: false,
      imageUrl: this.state.imageUrl,
      imagePlayerURL: this.state.imagePlayerURL,
      roomId: this.props.room.id,
      trackName: this.state.trackName,
      artistName: this.state.artistName,
      duration: this.props.duration
    });
    this.setState({active: !this.state.active});
    // this.props.sortFunc();
    socket.emit('new_queue');
  };

  async handleLike() {
    const newLikes = this.state.likes + 1;
    const newVotes = this.state.likes + 1 - this.state.dislikes;
    this.setState({
      disabled: !this.state.disabled
    });
    await this.props.vote(this.props.item.id, {
      upVotes: newLikes,
      votes: newVotes
    });
    console.log('have not sent fetch yet');
    // await this.props.sortFunc();
    socket.emit('new_queue');
  }

  async handleDislike() {
    const newDislikes = this.state.dislikes + 1;
    const newVotes = this.state.likes - 1 - this.state.dislikes;
    this.setState({
      disabled: !this.state.disabled
    });
    await this.props.vote(this.props.item.id, {
      downVotes: newDislikes,
      votes: newVotes
    });
    // await this.props.sortFunc();
    socket.emit('new_queue');
  }
  render() {
    return (
      <div>
        <Card>
          <Card.Content>
            <Image
              floated="left"
              circular
              size="mini"
              src={this.state.imageUrl}
            />
            <Card.Header>{this.state.trackName}</Card.Header>
            <Card.Description>{this.state.artistName}</Card.Description>
          </Card.Content>
          {this.state.addedBy !== 'search' ? (
            <Card.Content extra>
              <Button
                as="div"
                onClick={() => {
                  this.props.removeFromQueue(this.props.item.id);
                  socket.emit('new_queue');
                }}
                icon
              >
                <Icon name="delete" />
              </Button>
              <Button
                as="div"
                disabled={this.state.disabled}
                labelPosition="right"
                onClick={this.handleLike}
              >
                <Button
                  icon
                  onClick={this.handleLike}
                  // disabled={this.state.disabled}
                >
                  <Icon name="thumbs up outline" />
                </Button>
                <Label as="a" basic pointing="left">
                  {this.props.item.upVotes || 0}
                </Label>
              </Button>

              <Button
                as="div"
                disabled={this.state.disabled}
                labelPosition="right"
              >
                <Button
                  icon
                  onClick={this.handleDislike}
                  // disabled={this.state.disabled}
                >
                  <Icon name="thumbs down outline" />
                </Button>
                <Label as="a" basic pointing="left">
                  {this.props.item.downVotes || 0}
                </Label>
              </Button>
            </Card.Content>
          ) : (
            <Card.Content extra>
              <Button
                onClick={this.handleClick}
                toggle
                active={this.state.active}
                disabled={!this.state.active}
              >
                <Icon name="add circle" />
              </Button>
            </Card.Content>
          )}
        </Card>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    room: state.room
  };
};

const mapDispatch = (dispatch, ownProps) => ({
  fetchUser: id => dispatch(fetchUser(id)),
  vote: (itemId, votes) => {
    dispatch(updateVote(itemId, votes));
  },
  addQueue: item => {
    dispatch(addToQueue({item}));
  },
  removeFromQueue: id => dispatch(removeFromQueue(id))
});

export const QueueElement = connect(mapState, mapDispatch)(
  UnconnectedQueueElement
);
