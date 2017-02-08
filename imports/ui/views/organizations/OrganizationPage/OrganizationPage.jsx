import React, { Component, PropTypes } from 'react'

import { createContainer } from 'meteor/react-meteor-data'

import Loading from '/imports/ui/components/Loading'
import OrganizationBasicInfo from '/imports/ui/views/organizations/OrganizationBasicInfo'
import PositionsList from '/imports/ui/views/positions/PositionsList'

import { Positions } from '/imports/api/Positions'

const styles = {
  twoColumnLayout: {
    display: "flex",
    flexWrap: "wrap",
  },
  columnOne: {
    flex: 2,
    minWidth: 200,
  },
  columnTwo: {
    flex: 3,
    minWidth: 300,
  }
}

class OrganizationPage extends Component {

  render() {
    if(this.props.loading) {
      return <Loading />
    } else {

      return (
        <div style={styles.twoColumnLayout}>
          <div style={styles.columnOne}>
            <OrganizationBasicInfo organization={this.props.organization}/>
            {/* TODO: pass in query to get all positions for org id */}
            <PositionsList />
          </div>
          <div style={styles.columnTwo}>
            (About Us Mission goes here)
          </div>
        </div>
      )
    }
  }

}

OrganizationPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  organization: PropTypes.object.isRequired,
}

export default OrganizationPage
