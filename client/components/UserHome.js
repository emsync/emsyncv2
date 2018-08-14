import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {RoomsList} from './RoomsList'
import {fetchRooms} from '../store/rooms'
/**
 * COMPONENT
 */
export class UserHome extends Component {
  componentDidMount() {
    this.props.fetchRooms()
  }
  render() {
    return (
      this.props.rooms.length && (
        <div>
          <h3>Welcome</h3>
          <RoomsList rooms={this.props.rooms} />
        </div>
      )
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    rooms: state.rooms
  }
}

const mapDispatch = dispatch => ({
  fetchRooms: () => dispatch(fetchRooms())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
