import React, {Component} from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {me} from '../store';
import {connect} from 'react-redux';
import socket from '../socket';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = () => {
    this.setState({loggedIn: !this.state.loggedIn});
  };

  async componentDidMount() {
    await this.props.loadInitialData();
  }

  render() {
    return (
      //if logged in show username
      <div>
        <Menu stackable inverted>
          <Menu.Item as={Link} to="/">
            <img src="/img/emsync-logo.jpeg" alt="emSync Logo" />
          </Menu.Item>
          {!this.props.user.name ? (
            <Menu.Item href="/auth/spotify" key={1}>
              Login
            </Menu.Item>
          ) : null}

          <Menu.Item key={2}>Test</Menu.Item>

          {/* If user is logged in */}
          {this.props.user.name
            ? [
                <Menu.Item
                  className="navRight"
                  position="right"
                  name="welcomeUser"
                  key={2}
                >
                  Welcome {this.props.user.name}
                </Menu.Item>,
                <Menu.Item
                  as={Link}
                  to="/add-room"
                  className="navRight"
                  position="right"
                  name="addRoom"
                  key={2}
                >
                  Add Room
                </Menu.Item>,
                <Menu.Item
                  className="navRight"
                  name="logout"
                  href="/auth/spotify/logout"
                  key={2}
                >
                  Logout
                </Menu.Item>
              ]
            : null}
        </Menu>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData: () => {
      dispatch(me());
    }
  };
};

export default connect(mapState, mapDispatch)(NavBar);
