import React, { Component } from "react";
import { List, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchUser } from "../store/user";
//props being passed here should just be a single listener (user) object
class UnconnectedListenerElement extends Component {
  constructor() {
    super();
    this.state = {
      listener: {}
    };
  }

  async componentDidMount() {
    const listener = await this.props.fetchUser(this.props.listener);
    this.setState({
      listener
    });
  }

  render() {
    return (
      <div>
        <Image avatar src={this.state.listener.imageUrl} />
        <List.Content>
          <List.Header as="a">{this.state.listener.name}</List.Header>
        </List.Content>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  fetchUser: id => dispatch(fetchUser(id));
};

export const ListenerElement = connect(
  null,
  mapDispatch
)(UnconnectedListenerElement);
