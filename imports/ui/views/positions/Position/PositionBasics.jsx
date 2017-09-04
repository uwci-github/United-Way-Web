import React, {Component} from 'react'
import _ from 'lodash'

import People from 'material-ui/svg-icons/social/people'
import Person from 'material-ui/svg-icons/social/person'

class PositionBasics extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let opportunityTypeIcon = this.props.position.opportunityType === 'committee' ? <Person/> : <People/>;
    let orgName = !_.get(this.props, 'organization.name') ? '' : this.props.organization.name;

    return (
      <div style={styles.basicInfoContainer}>
        <div style={styles.iconContainer}>
          {opportunityTypeIcon}
        </div>
        <div style={styles.basicDetailsContainer}>
          <div style={styles.organizationName}>
            {orgName}
          </div>
          <div style={styles.positionTitle}>
            {this.props.position.name}
          </div>
          <div style={styles.dates}>
            {this.props.position.deadline.toDateString()}
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  basicInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  basicDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  iconContainer: {
    alignSelf: 'center',
    padding: '0 16px',
  },

  organizationName: {
    fontSize: '16px',
    textDecoration: 'underline'
  },

  positionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
  },

  dates: {
    fontSize: '14px',
    textDecoration: 'italic'
  }
}

export default PositionBasics