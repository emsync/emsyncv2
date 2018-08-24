import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {
  Button,
  Form,
  Input,
  Label,
  Accordion,
  TextArea,
  Segment,
  Header
} from 'semantic-ui-react';
import {createRoom} from '../store/rooms';
import GiphySearch from './giphySearch';

export class UnconnectedRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isPrivate: false,
      description: '',
      imageUrl: '',
      createdBy: Number(this.props.user.id),
      allowAdd: false,
      isDemocratic: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clicker = this.clicker.bind(this);
  }

  allowAdd() {
    return [
      {
        key: 't',
        text: 'Allow',
        value: true,
        onClick: this.handleClick,
        name: 'allowAdd'
      },
      {
        key: 'f',
        text: 'Block',
        value: false,
        onClick: this.handleClick,
        name: 'allowAdd'
      }
    ];
  }

  isPrivate() {
    return [
      {
        key: 't',
        text: 'Private',
        value: true,
        onClick: this.handleClick,
        name: 'isPrivate'
      },
      {
        key: 'f',
        text: 'Public',
        value: false,
        onClick: this.handleClick,
        name: 'isPrivate'
      }
    ];
  }

  isDemocratic() {
    return [
      {
        key: 't',
        text: 'Votes',
        value: true,
        onClick: this.handleClick,
        name: 'isDemocratic'
      },
      {
        key: 'f',
        text: 'Time Added',
        value: false,
        onClick: this.handleClick,
        name: 'isDemocratic'
      }
    ];
  }

  panels = () => {
    return _.times(1, i => ({
      key: `panel-${i}`,
      title: {
        content: <Label color="red" content="Search using GIPHY" />
      },
      content: {
        content: <GiphySearch clicker={this.clicker} />
      }
    }));
  };
  clicker = url => {
    this.setState({imageUrl: url});
  };

  handleClick = (event, data) => {
    this.setState({[data.name]: data.value});
  };

  handleChange(event, {value}) {
    this.setState({[event.target.name]: value});
  }

  handleSubmit() {
    this.props.createRoom(this.state);
    this.props.history.push('/user');
  }

  render() {
    return (
      <Segment
        style={{marginTop: 30, marginLeft: '30%', border: '1px solid grey'}}
        inverted
      >
        <Header centered style={{fontSize: 45}}>
          Create a room!
        </Header>
        <Form inverted centered>
          <Form.Field
            inline
            control={Input}
            required
            name="name"
            label="Name"
            placeholder="Name"
            onChange={this.handleChange}
          />
          <Form.Field
            inline
            control={Input}
            required
            label="Description"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
          <Form.Select
            fluid
            value={this.state.allowAdd}
            required
            name="allowAdd"
            label="Allow listeners to add to queue"
            options={this.allowAdd()}
            placeholder="Select"
          />

          <Form.Field
            inline
            control={Input}
            value={this.state.imageUrl}
            required
            label="Image Url"
            name="imageUrl"
            placeholder="Image Url"
            onChange={this.handleChange}
          />
        </Form>
        <Accordion panels={this.panels()} defaultActiveIndex={1} />
        <div className="submitButton">
          <Button
            // attached="bottom"
            control={Button}
            type="submit"
            onClick={this.handleSubmit}
            positive
          >
            Submit
          </Button>
        </div>
      </Segment>
    );
  }
}

const mapState = state => ({
  user: state.user
});
const mapDispatch = dispatch => ({
  createRoom: room => dispatch(createRoom(room))
});

export const RoomForm = connect(mapState, mapDispatch)(UnconnectedRoomForm);
