import React, {Component} from 'react';
import CardContent, {List, Image} from 'semantic-ui-react';
import {Button, Icon, Label, Card} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchUser} from '../store/user';
import {updateVote, addToQueue} from '../store/queue';

//props being passed here should just be a single listener (user) object
class UnconnectedQueueElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.comingFrom ? 0 : this.props.item.upVotes || 0,
      dislikes: this.props.comingFrom ? 0 : this.props.item.upVotes || 0,
      // votes: 0,
      disabled: false,
      addedBy: this.props.comingFrom ? 'search' : this.props.item.userId,
      imageUrl: this.props.imageUrl || this.props.item.imageUrl,
      spotifyLink: this.props.spotifyLink || this.props.item.spotifyLink,
      trackName:
        this.props.trackName || this.props.item.trackName || 'Hallelujah',
      artistName: this.props.artistName || this.props.item.artistName
    };
    this.handleDislike = this.handleDislike.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     imageUrl: this.props.item.imageUrl || this.props.imageUrl,
  //     spotifyLink: this.props.item.spotifyLink || this.props.spotifyLink
  //     trackName: this.props.item.sp
  //   });
  // }

  handleClick = () => {
    console.log('In QueueElement handleClick: ', this.props.room.id);
    this.props.addQueue({
      // votes: this.state.likes - this.state.disklikes,
      addedBy: this.props.user.id,
      spotifyLink: this.state.spotifyLink,
      currentPlayingTime: 0,
      isPlaying: false,
      imageUrl: this.state.imageUrl,
      roomId: this.props.room.id,
      trackName: this.state.trackName,
      artistName: this.state.artistName
    });
  };

  async handleLike() {
    const newLikes = this.state.likes + 1;
    const newVotes = this.state.likes + 1 - this.state.dislikes;
    this.setState({
      likes: newLikes,
      votes: newVotes,
      disabled: true
    });
    await this.props.vote(this.props.item.id, {
      upVotes: newLikes,
      votes: newVotes
    });
    this.props.sortFunc();
  }

  async handleDislike() {
    const newDislikes = this.state.dislikes + 1;
    const newVotes = this.state.likes - 1 - this.state.dislikes;
    this.setState({
      dislikes: newDislikes,
      votes: newVotes,
      disabled: true
    });
    await this.props.vote(this.props.item.id, {
      downVotes: newDislikes,
      votes: newVotes
    });
    this.props.sortFunc();
  }
  render() {
    // console.log('In QueueElement: ', this.props.room.id);
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
                disabled={this.state.disabled ? true : false}
                labelPosition="right"
              >
                <Button icon onClick={this.handleLike}>
                  <Icon name="thumbs up outline" />
                </Button>
                <Label as="a" basic pointing="left">
                  {this.state.likes}
                </Label>
              </Button>
              <Button
                as="div"
                disabled={this.state.disabled ? true : false}
                labelPosition="right"
              >
                <Button icon onClick={this.handleDislike}>
                  <Icon name="thumbs down outline" />
                </Button>
                <Label as="a" basic pointing="left">
                  {this.state.dislikes}
                </Label>
              </Button>
            </Card.Content>
          ) : (
            <Card.Content extra>
              <Button onClick={this.handleClick}>
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
  }
});

export const QueueElement = connect(mapState, mapDispatch)(
  UnconnectedQueueElement
);
