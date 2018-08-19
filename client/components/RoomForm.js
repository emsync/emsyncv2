import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Radio,
  Select,
  TextArea,
  Segment
} from 'semantic-ui-react';
import {createRoom} from '../store/rooms';

const options = [
  {key: 'm', text: 'Male', value: 'male'},
  {key: 'f', text: 'Female', value: 'female'}
];

//what do we even want in the form?
// name, imageUrl, isPrivate toggle (what does this mean in terms of rendering, password?), description

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
      isDemocratic: true
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
    return (
      <Segment.Group>
        <Segment>Create a room!</Segment>
        <Segment.Group horizontal={true}>
          <Form>
            <Segment>
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
            </Segment>
            <Segment>
              <Form.Group inline>
                <Form.Field
                  label="Sort queue by"
                  name="isDemocratic"
                  control="select"
                >
                  <option value={false}>Time added</option>
                  <option value={true}>Votes</option>
                </Form.Field>
                <Form.Field
                  label="Allow listeners to add to queue"
                  name="allowAdd"
                  control="select"
                >
                  <option value={false}>Do not allow</option>
                  <option value={true}>Allow</option>
                </Form.Field>
                <Form.Field
                  label="Require a password to enter"
                  name="isPrivate"
                  control="select"
                >
                  <option value={false}>Public</option>
                  <option value={true}>Private</option>
                </Form.Field>
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
