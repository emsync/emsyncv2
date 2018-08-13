import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import ListenersList from './ListenersList'
import {fetchRoom, addToQueue} from '../store/room'
import Queue from './Queue'
class RoomView extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchRoom()
  }

  handleClick() {
    console.log('clicked!')
    this.props.addToQueue({name: 'Baby', artist: 'Justin Biebser'})
  }

  render() {
    return this.props.room ? (
      <div>
        <h1>{this.props.room.name}</h1>
        <ListenersList listeners={this.props.room.listeners} />
        <Queue queue={this.props.room.queue} />
        <button onClick={this.handleClick}>Add to queue!</button>
      </div>
    ) : (
      <p>Loading...</p>
    )
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchRoom: () => dispatch(fetchRoom(ownProps.match.params.id)),
  addToQueue: song => dispatch(addToQueue(song, ownProps.match.params.id))
})

const mapState = (state, ownProps) => {
  return {
    room: state.room
  }
}

export default connect(mapState, mapDispatch)(RoomView)
