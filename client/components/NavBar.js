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
    // console.log('USER: ', this.props.user.name);
    let key = 0;
    return (
      //if logged in show username
      <div>
        <Menu stackable inverted>
          <Menu.Item as={Link} to="/">
            <img src="/img/emsync-logo.jpeg" alt="emSync Logo" />
          </Menu.Item>
          {!this.props.user.name ? (
            <Menu.Item href="/auth/spotify" key={key++}>
              Login
            </Menu.Item>
          ) : null}

          {/* If user is logged in */}
          {this.props.user.name
            ? [
                <Menu.Item position="right" name="welcomeUser" key={key++}>
                  Welcome {this.props.user.name}
                </Menu.Item>,
                <Menu.Item
                  as={Link}
                  to="/add-room"
                  position="right"
                  name="addRoom"
                  key={key++}
                >
                  Add Room
                </Menu.Item>,
                <Menu.Item
                  name="logout"
                  href="/auth/spotify/logout"
                  key={key++}
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
