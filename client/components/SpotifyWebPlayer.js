import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';

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
      volume: 1
    };
    this.checkInterval = null;
  }

  componentDidMount() {
    console.log('component mounted');
    this.loadSpotify();
    this.setState({token: this.props.user.accessToken, loggedIn: true});
    console.log('able to print!');
  }

  loadSpotify = () => {
    console.log('called', this.state);

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
        // console.log('player!', this.player);
        this.eventHandlers();
        this.player.connect();
      }
    }
  };

  onStateChange = state => {
    console.log('new state!', state);
    if (state !== null) {
      const {
        current_track: currentTrack,
        position,
        duration
      } = state.track_window;
      console.log('new track!', currentTrack);
      const trackName = currentTrack.name;
      const albumName = currentTrack.album.name;
      const images = currentTrack.album.images;
      const artistName = currentTrack.artists
        .map(artist => artist.name)
        .join(',');
      const playing = !state.paused;
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
  };

  eventHandlers() {
    this.player.on('initialization_error', er => {
      console.error(err);
    });
    this.player.on('authentication_error', er => {
      this.setState({loggedIn: false});
      console.error(err);
    });
    this.player.on('account_error', er => {
      console.error(err);
    });
    this.player.on('playback_error', er => {
      console.error(err);
    });

    this.player.on('player_state_changed', state => {
      console.log(state);
    });

    this.player.on('ready', data => {
      let {deviceId, token} = data;
      fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({device_ids: [deviceId], play: true})
      });
      this.setState({deviceId});
    });
    console.log('Playing Music');

    this.player.on('player_state_changed', state => this.onStateChange(state));
  }

  // Bound Functions
  onPausePlayClick = () => {
    // this.player.togglePlay();

    this.player.setVolume(this.state.volume);
    if (this.state.volume === 1) {
      this.setState({volume: 0});
    } else {
      this.setState({volume: 1});
    }
  };

  transferPlayback = () => {
    const deviceId = this.state.deviceId;
    const token = this.state.token;
    fetch('https://');
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
    user: state.user
  };
};

export default connect(mapState, null)(SpotifyWebPlayer);
