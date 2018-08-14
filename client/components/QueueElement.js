// import React, {Component} from 'react'
// import {List, Image} from 'semantic-ui-react'
// import {Button, Icon, Label} from 'semantic-ui-react'
// import {connect} from 'react-redux'
// import {fetchUser} from '../store/user'
// //props being passed here should just be a single listener (user) object
// class UnconnectedQueueElement extends Component {
//   constructor() {
//     super()
//     this.state = {
//       likes: 0,
//       dislikes: 0,
//       disabled: false
//     }
//     this.handleDislike = this.handleDislike.bind(this)
//     this.handleLike = this.handleLike.bind(this)
//   }

//   handleLike() {
//     this.setState({
//       likes: this.state.likes + 1,
//       disabled: true
//     })
//   }

//   handleDislike() {
//     this.setState({
//       dislikes: this.state.dislikes + 1,
//       disabled: true
//     })
//   }
//   render() {
//     return (
//       <div>
//         <List.Content>
//           <List.Header as="a">{this.props.song.name}</List.Header>
//           <Button as="div" labelPosition="right">
//             <Button icon onClick={this.handleLike}>
//               <Icon name="thumbs up outline" />
//             </Button>
//             <Label as="a" basic pointing="left">
//               {this.state.likes}
//             </Label>
//           </Button>
//           <Button as="div" labelPosition="right">
//             <Button icon onClick={this.handleDislike}>
//               <Icon name="thumbs down outline" />
//             </Button>
//             <Label as="a" basic pointing="left">
//               {this.state.dislikes}
//             </Label>
//           </Button>
//         </List.Content>
//       </div>
//     )
//   }
// }

// const mapDispatch = dispatch => {
//   fetchUser: id => dispatch(fetchUser(id))
// }

// export const QueueElement = connect(null, mapDispatch)(UnconnectedQueueElement)
