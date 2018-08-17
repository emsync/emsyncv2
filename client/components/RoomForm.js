import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea
} from 'semantic-ui-react';
import {createRoom} from '../store/rooms';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'}
];

//what do we even want in the form?
// name, imageUrl, isPrivate toggle (what does this mean in terms of rendering, password?), description

export class UnconnectedRoomForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isPrivate: false,
      description: '',
      imageUrl: '',
      createBy: this.props.user.id
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, {value}) {
    this.setState({[event.target.name]: value});
  }

  handleSubmit() {
    this.props.createRoom(this.state);
  }

  render() {
    // console.log(this.state);
    const {value} = this.state;
    return (
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onChange={this.handleChange}
          />
          <Form.Field
            control={TextArea}
            label="Description"
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
          <Form.Field
            control={Input}
            label="Image Url"
            name="imageUrl"
            placeholder="Image Url"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Private Room</label>
          <Form.Field
            control={Radio}
            label="Yes"
            name="private"
            value="Yes"
            checked={value === 'Yes'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label="No"
            name="private"
            value="No"
            checked={value === 'No'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group inline>
          <label>Queue sorted by:</label>
          <Form.Field
            control={Radio}
            label="Time"
            name="sort"
            value="time"
            checked={value === 'time'}
            onChange={this.handleChange}
          />
          <Form.Field
            control={Radio}
            label="Votes"
            name="sort"
            value="votes"
            checked={value === 'votes'}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Field onClick={this.handleSubmit} control={Button}>
          Submit
        </Form.Field>
      </Form>
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
