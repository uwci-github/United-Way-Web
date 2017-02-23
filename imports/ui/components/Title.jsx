import React, { Component } from 'react'

const styles = {
  title: {
    fontSize: '25px',
    fontWeight: 'bold',
  },
}

class Title extends Component {

  render() {
    return (
      <div style={styles.title}>
        {this.props.children}
      </div>
    )
  }

}

export default Title
