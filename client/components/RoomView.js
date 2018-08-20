import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListenersList from './ListenersList';
import {fetchRoom} from '../store/room';
import {addToQueue, fetchQueues} from '../store/queue';
import {fetchUser} from '../store/user';
import {Queue} from './Queue';
import socket from '../socket';
import {Card, Image, Header} from 'semantic-ui-react';
import {ListenerElement} from './ListenerElement';
import {Player} from './index';
import ReactSpeedometer from 'react-d3-speedometer';
import SpotifyWebPlayer from './SpotifyWebPlayer';
import SearchForm from './SearchForm';
import RoomSettings from './RoomSettings';

class RoomView extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getDj = this.getDj.bind(this);
    this.state = {
      listeners: [],
      DJ: {}
    };
    socket.on('update-listeners', (room, listenerList) => {
      if (room == this.props.room.id) {
        const userNames = [];
        for (let i = 0; i < listenerList.length; i++) {
          userNames.push(listenerList[i].name);
        }
        this.setState({listeners: userNames});
      }
    });
  }

  async getDj() {
    const DJ = await this.props.getDJ();
    this.setState({
      DJ
    });
  }
  async componentDidMount() {
    await this.props.fetchRoom();
    console.log(this.props.room.id);
    await this.props.fetchQueues(this.props.room.id);
    await this.getDj();
  }

  componentWillUnmount() {
    socket.emit('left', socket.id, this.props.match.params.id);
  }

  handleClick() {
    // console.log('clicked!');
    this.props.addToQueue({name: 'Baby', artist: 'Justin Biebser'});
  }

  // Bound Functions
  nextQueue = () => {};

  render() {
    // Listener stuff
    let present = false;
    if (this.props.user) {
      for (let i = 0; i < this.state.listeners.length; i++) {
        if (this.state.listeners[i] === this.props.user.name) {
          present = true;
        }
      }
    }
    if (this.props.user.name && !present) {
      // console.log('emitting joined command');
      socket.emit('joined', this.props.user, this.props.match.params.id);
    }
    // End of Listener Stuff
    console.log(this.state);
    return this.props.room.name ? (
      <div>
        <div>
          <Header
            as="h1"
            textAlign="center"
            style={{marginTop: 30, fontSize: 45}}
          >
            <Image circular src={this.props.room.imageUrl} size="small" />
            {this.props.room.name}
          </Header>
        </div>
        <br />
        <div className="room">
          <div className="leftRoom">
            {this.props.room.queueItems ? (
              <Queue
                queue={this.props.room.queueItems}
                roomId={this.props.match.params.id}
              />
            ) : null}
          </div>
          <div className="rightRoom">
            <ListenersList listeners={this.state.listeners} />
          </div>
          <div className="rightRoom">
            {this.state.DJ.name && (
              <RoomSettings user={this.state.DJ} room={this.props.room} />
            )}
          </div>
          <div>
            <SearchForm />
          </div>
          <div>
            <Card>
              <Card.Content>
                <Card.Header>Hot or Not</Card.Header>
              </Card.Content>
              <Card.Content>
                <ReactSpeedometer
                  maxValue={this.state.listeners.length}
                  minValue={-this.state.listeners.length}
                  value={0}
                  //itll be this.nowplaying.votes
                  needleColor="red"
                  segments={5}
                  needleTransitionDuration={4000}
                  needleTransition="easeElastic"
                />
              </Card.Content>
            </Card>
            <SpotifyWebPlayer roomId={this.props.room.id} />
          </div>
        </div>
      </div>
    ) : (
      <p>Loading...</p>
    );
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchRoom: () => dispatch(fetchRoom(ownProps.match.params.id)),
  addToQueue: song => dispatch(addToQueue(song, ownProps.match.params.id)),
  fetchQueues: roomId => dispatch(fetchQueues(roomId)),
  getDJ: () => dispatch(fetchUser(ownProps.match.params.id))
});

const mapState = (state, ownProps) => {
  return {
    room: state.room,
    user: state.user
  };
};

export default connect(mapState, mapDispatch)(RoomView);
