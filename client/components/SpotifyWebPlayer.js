import React, {Component} from 'react';
import {connect} from 'react-redux';
import {removeFromQueue, playSongs} from '../store/queue';
import socket from '../socket';

class SpotifyWebPlayer extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      deviceId: '',
      loggedIn: false,
      error: '',
      trackName: '',
      artistName: '',
      albumName: '',
      playing: false,
      position: 0,
      duration: 0,
      images: [],
      volume: 1,
      prevTrack: '',
      lastSong: false
    };
    this.checkInterval = null;

    socket.on('next_track', () => {
      // console.log('next_track requested', this.nextTrack());
    });
  }

  // Lifecycle methods
  componentDidMount() {
    this.loadSpotify();
    this.setState({token: this.props.user.accessToken, loggedIn: true});
  }

  componentWillUnmount() {
    this.player.disconnect().then(() => console.log('player disconnected'));
  }
  // end

  loadSpotify = () => {
    // console.log('called', this.state);

    this.checkInterval = setInterval(() => {
      this.checkForPlayer();
    }, 1000);
  };

  checkForPlayer = () => {
    // console.log('checking', this.state.token);
    if (this.state.token !== '') {
      // console.log('hi there', window);
      const {token} = this.state;
      // clearInterval(this.checkInterval);
      if (window.Spotify !== null) {
        clearInterval(this.checkInterval);
        // console.log('interval? ', this.checkInterval);
        this.player = new window.Spotify.Player({
          name: 'emSync Spotify Player',
          getOAuthToken: callBack => {
            callBack(token);
          }
        });
        this.eventHandlers();
        this.player.connect();
      }
    }
  };

  onStateChange = state => {
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = state.track_window;
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const images = currentTrack.album.images;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(',');
      const playing = !state.paused;
      if (state.track_window.previous_tracks.length) {
        this.nextTrack();
      } else {
        this.setState({
          position,
          duration,
          trackName,
          albumName,
          artistName,
          playing,
          images
        });
      }
    }
  };

  async eventHandlers() {
    this.player.on('initialization_error', err => {
      console.error(err);
    });
    this.player.on('authentication_error', err => {
      this.setState({loggedIn: false});
      console.error(err);
    });
    this.player.on('account_error', err => {
      console.error(err);
    });
    this.player.on('playback_error', err => {
      console.error(err);
    });

    this.player.on('player_state_changed', state => {
      this.onStateChange(state);
    });

    this.player.on('ready', async data => {
      let {device_id} = data;
      this.setState({deviceId: device_id});
      await this.transferPlayback();
      console.log('Playing Music');
    });
  }
  // Bound Functions
  onPausePlayClick = () => {
    this.player.togglePlay();
  };

  mute = () => {
    if (this.state.volume > 0) {
      this.setState({volume: 0});
      this.player.setVolume(0);
      this.setState({lastSong: false});
    } else {
      this.setState({volume: 1});
      this.player.setVolume(1);
      this.setState({lastSong: true});
    }
  };

  playTrack = async (song, position) => {
    let auth;
    try {
      auth = await this.bearerToken();
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${
          this.state.deviceId
        }`,
        {
          method: 'PUT',
          body: JSON.stringify({
            uris: [song.spotifyLink],
            position_ms: position || 0
          }),
          headers: {
            'Content-Type': 'application/json',
            ...auth
          }
        }
      );
    } catch (err) {
      console.error(err);
    }

    if (!position) {
      const d = await new Date();
      const startTimeStamp = await d.getTime();
      try {
        await this.props.playSong({
          id: song.id,
          startTimeStamp,
          isPlaying: true
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  makeRequest = async (url, body) => {
    try {
      let auth = await this.bearerToken();
      const response = await fetch(url, {
        method: 'PUT',
        headers: auth,
        body
      });
      return response;
    } catch (err) {
      console.error(err);
    }
  };

  nextTrack = async () => {
    if (this.props.queue[1]) {
      await this.props.nextSong(this.props.queue[0].id);
      await this.playTrack(this.props.queue[1]);
    } else {
      await this.playTrack(this.props.queue[1]);
    }
    socket.emit('next_track');
  };

  transferPlayback = async () => {
    /**
     * Will set current device to emSync and then start playing the current item in the queue
     * position should be 0 if the song has completed
     * (aka need a user in the room to go to next song)
     */

    const deviceId = this.state.deviceId;
    const token = this.state.token;
    const response = await fetch('https://api.spotify.com/v1/me/player', {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({device_ids: [deviceId], play: true})
    });
    // console.log('fetch response', response);
    this.syncOnJoin();
  };

  syncOnJoin = async () => {
    if (!this.props.queue[0].isPlaying) {
      await this.playTrack(this.props.queue[0]);
    } else {
      const d = await new Date();
      const time = await d.getTime();
      var position = 0;
      const startedAt = this.props.queue[0].startTimeStamp;
      console.log('start time was:', startedAt, ' and current time is', time);
      console.log('difference is', time - startedAt);
      if (time - startedAt > this.props.queue[0].duration) {
        // console.log('starting from beginning');
        position = 0;
      } else {
        // console.log('resuming from position', position);
        position = time - startedAt || 0;
      }
      await this.playTrack(this.props.queue[0], position);
    }
  };

  bearerToken = () => {
    if (this.props.user) {
      let headers = {};
      headers.authorization = `Bearer ${this.state.token}`;
      headers['Content-Type'] = 'application/json';
      return headers;
    }
  };

  sync = () => {
    console.log('something');
  };

  render() {
    const {
      token,
      loggedIn,
      artistName,
      trackName,
      albumName,
      error,
      position,
      duration,
      playing,
      images
    } = this.state;

    // Set image URL if there is one
    let imageUrl = undefined;
    if (images[0]) {
      imageUrl = images[0].url;
    }

    return (
      <div className="spotify-player">
        <div>
          <h2>Now Playing</h2>
        </div>
        <div>
          {error && <p>Error: {error}</p>}
          {loggedIn ? (
            <div>
              <img
                src={imageUrl}
                onError={i => (i.target.style.display = 'none')}
              />
              <p>Artist: {artistName !== '' ? artistName : 'n/a'}</p>
              <p>Track: {trackName !== '' ? trackName : 'n/a'}</p>
              <p>Album: {albumName !== '' ? albumName : 'n/a'}</p>
              <p>Playing: {playing ? 'Yes' : 'No'}</p>
              <p>
                <button onClick={this.onPausePlayClick}>
                  {playing ? 'Pause' : 'Play'}
                </button>
                <button onClick={this.mute}>
                  {this.state.volume > 0 ? 'Mute' : 'Unmute'}
                </button>
                <button onClick={this.nextTrack}>Next Track</button>
                <button onClick={this.sync}>Sync</button>
              </p>
            </div>
          ) : (
            <div>
              <a>Please login</a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  console.log('state updated');
  return {
    user: state.user,
    queue: state.queue
  };
};

const mapDispatch = dispatch => {
  return {
    nextSong: id => {
      dispatch(removeFromQueue(id));
    },
    playSong: item => {
      dispatch(playSongs(item));
    }
  };
};

export default connect(mapState, mapDispatch)(SpotifyWebPlayer);
