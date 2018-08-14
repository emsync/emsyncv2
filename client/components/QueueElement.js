import React, {Component} from 'react';
import {List, Image} from 'semantic-ui-react';
import {Button, Icon, Label} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {fetchUser} from '../store/user';
import {updateVote, addToQueue} from '../store/queue';
//props being passed here should just be a single listener (user) object
class UnconnectedQueueElement extends Component {
  constructor() {
    super();
    this.state = {
      likes: 122,
      dislikes: 123,
      disabled: false,
      addedBy: '',
      imageUrl: '',
      spotifyLink: ''
    };
    this.handleDislike = this.handleDislike.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    this.setState({
      imageUrl: this.props.imageUrl,
      spotifyLink: this.props.spotifyLink
    });
  }

  handleClick = () => {
    this.props.addToQueue({
      votes: this.state.likes - this.state.disklikes,
      addedBy: this.props.user.id,
      spotifyLink: this.state.spotifyLink,
      currentPlayingTime: '00:00:00',
      isPlaying: false,
      imageUrl: this.state.imageUrl
    });
  };

  handleLike() {
    this.setState({
      likes: this.state.likes + 1,
      disabled: true
    });
    this.props.vote(this.props.id, {
      votes: this.state.likes - this.state.dislikes
    });
    this.props.sort();
  }

  handleDislike() {
    this.setState({
      dislikes: this.state.dislikes + 1,
      disabled: true
    });
  }
  render() {
    return (
      <div>
        <List.Content>
          <List.Header as="a">{this.state.song.name}</List.Header>
          {this.state.addedBy ? (
            <div>
              <Button as="div" labelPosition="right">
                <Button icon onClick={this.handleLike}>
                  <Icon name="thumbs up outline" />
                </Button>
                <Label as="a" basic pointing="left">
                  {this.state.likes}
                </Label>
              </Button>
              <Button as="div" labelPosition="right">
                <Button icon onClick={this.handleDislike}>
                  <Icon name="thumbs down outline" />
                </Button>
                <Label as="a" basic pointing="left">
                  {this.state.dislikes}
                </Label>
              </Button>
            </div>
          ) : (
            <Button onClick={this.handleClick}>
              <Icon name="add circle" />
            </Button>
          )}
        </List.Content>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = (dispatch, ownProps) => {
  fetchUser: id => dispatch(fetchUser(id));
  vote: (itemId, votes) => {
    dispatch(updateVote(itemId, votes));
  };
  addQueue: item => {
    dispatch(addToQueue({...item, roomId: ownProps.match.params.id}));
  };
};

export const QueueElement = connect(mapState, mapDispatch)(
  UnconnectedQueueElement
);
