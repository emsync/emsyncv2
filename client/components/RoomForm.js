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
  Segment
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
    this.onClick = this.onClick.bind(this);
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
        content: <GiphySearch clicker={this.onClick} />
      }
    }));
  };
  onClick = (event, data) => {
    this.setState({imageUrl: data.content});
  };

  handleClick = (event, data) => {
    console.log(data);
    this.setState({[data.name]: data.value});
  };

  handleChange(event, {value}) {
    this.setState({[event.target.name]: value});
  }

  handleSubmit() {
    this.props.createRoom(this.state);
    this.props.history.push('/');
  }

  render() {
    console.log(this.state);
    return (
      <Segment.Group>
        <Segment>Create a room!</Segment>
        <Segment.Group horizontal={true}>
          <Form>
            <Segment>
              <Form.Group widths="equal">
                <Form.Field
                  control={Input}
                  required
                  name="name"
                  label="Name"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
                <Form.Field
                  control={TextArea}
                  required
                  label="Description"
                  name="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Segment>
                  <Form.Field
                    control={Input}
                    required
                    label="Image Url"
                    name="imageUrl"
                    placeholder="Image Url"
                    onChange={this.handleChange}
                  />
                  <Accordion panels={this.panels()} defaultActiveIndex={1} />
                </Segment>
              </Form.Group>
            </Segment>
            <Segment>
              <Form.Group inline>
                <Form.Select
                  fluid
                  required
                  name="isDemocratic"
                  label="Sort queue by:"
                  options={this.isDemocratic()}
                  placeholder="Select"
                />
                <Form.Select
                  fluid
                  required
                  name="allowAdd"
                  label="Allow listeners to add to queue"
                  options={this.allowAdd()}
                  placeholder="Select"
                />
                <Form.Select
                  fluid
                  required
                  name="isPrivate"
                  label="Room privacy"
                  options={this.isPrivate()}
                  placeholder="Select"
                />
              </Form.Group>
            </Segment>
            <Form.Field onClick={this.handleSubmit} control={Button}>
              Submit
            </Form.Field>
          </Form>
        </Segment.Group>
      </Segment.Group>
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
