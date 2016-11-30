import React, { Component } from 'react'
import { grey200 } from 'material-ui/styles/colors'

const styles = {
  container: {
    backgroundColor: grey200,
    padding: '10px',
  },
  img: {
    width: '100%',
  },
  name: {
    fontSize: '25px',
  }
}

class UserCard extends Component {

  render() {
    return (
      <div style={styles.container}>
        <img src={this.props.avatarUrl} style={styles.img} />
        <div style={styles.name}>
          John Smith
        </div>
      </div>
    )
  }

}

export default UserCard
