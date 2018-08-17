import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Progress, Container, Image} from 'semantic-ui-react';

class Player extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // await this.props.fetchQueues(this.props.room.id);
  }

  render() {
    return (
      <Container fluid>
        <Card>
          <Card.Content>
            <Card.Header>NOW PLAYING</Card.Header>
          </Card.Content>
          <Image
            src="https://i.scdn.co/image/1ade37a2764b63e4f0945b3eb07706bc1badec6e"
            size="medium"
          />
          <Card.Content>
            <Card.Header>Only Love Can Break Your Heart</Card.Header>
            <Card.Description>by Saint Etienne</Card.Description>
          </Card.Content>
        </Card>
        <Progress size="small" percent={30} color="orange" />
      </Container>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    room: state.room
  };
};

// const mapDispatch = dispatch => {
//   return {

//     }
//   };
// };

export default connect(mapState, null)(Player);
