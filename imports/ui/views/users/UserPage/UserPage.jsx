import React, { Component, PropTypes } from 'react'
import { TagCloud } from 'react-tagcloud'
import { Link } from 'react-router'
import { Tabs, Tab } from 'material-ui/Tabs';

import Breadcrumbs from '/imports/ui/components/Breadcrumbs'
import Content from '/imports/ui/components/Content'
import Interests from '/imports/ui/views/users/Interests'
import Loading from '/imports/ui/components/Loading'
import ProfessionalExperienceList from '/imports/ui/views/users/ProfessionalExperienceList'
import Summary from '/imports/ui/views/users/Summary'
import Title from '/imports/ui/components/Title'
import UserBasicInfo from '/imports/ui/views/users/UserBasicInfo'
import UserProfileButtons from '/imports/ui/views/users/UserProfileButtons'
import VolunteerExperienceList from '/imports/ui/views/users/VolunteerExperienceList'

const test_user = {
  avatarUrl: 'http://www.thewrap.com/wp-content/uploads/2015/11/Donald-Trump.jpg',
  name: "John Smith",
}

const styles = {
  twoColumnLayout: {
    display: "flex",
    flexWrap: "wrap",
    width: '100%'
  },
  columnOne: {
    flex: 1,
    minWidth: 200,
    marginRight: '24px'
  },
  columnTwo: {
    flex: 1,
    minWidth: 300,
    marginLeft: '24px'
  },
  cloud: {
    display: 'flex',
    margin: '16px auto',
    maxWidth: '420px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tag: {
    padding: '4px'
  },
  tabs: {
    display: 'flex',
    alignItems: 'left',
    width: 400,
    backgroundColor: '#0091ea',
  },
  tabContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '80%',
    maxWidth: '1440px',
    margin: 'auto'
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  recommendations: {
    padding: '32px'
  },
  tabBar: {
    width: '100%',
    position: 'absolute',
    background: '#0091ea',
    height: '48px'
  }
}

class UserPage extends Component {
  render() {
    const { loading, user, tags } = this.props
    let myUserId = Meteor.userId()
    let thisUserId = user ? user._id : null
    let thisIsMyProfile = myUserId == thisUserId
    if (thisIsMyProfile) {
      return (
        <div>
          <div style={styles.tabBar}></div>
          <Tabs tabItemContainerStyle={styles.tabs} style={styles.tabContainerStyle}>
            <Tab label="Profile">
              <Content><UserProfileTab editable={thisIsMyProfile} user={user} loading={loading} tags={tags} /></Content>
            </Tab>
            <Tab label="Recommendations">
              <Content><div style={styles.recommendations}>Recommendations coming soon</div></Content>
            </Tab>
          </Tabs>
        </div>
      )
    } else {
      return (
        <div>
          <Content><UserProfileTab user={user} loading={loading} tags={tags} /></Content>
        </div>
      )
    }
  }
}

class UserProfileTab extends Component {
  render() {
    if(this.props.loading) {
      return <Loading />
    } else {
      const name = `${this.props.user.profile.firstName} ${this.props.user.profile.lastName}`
      return (
        <div style={styles.container}>
          <div style={styles.twoColumnLayout}>
            <div style={styles.columnOne}>
              <Breadcrumbs crumbs={[
                  {text: 'Volunteers', path: '/users'},
                  {text: name, path: null}
                ]}
              />
              <UserBasicInfo editable={this.props.editable} user={this.props.user} tags={this.props.tags} />
              <Interests editable={this.props.editable} user={this.props.user} tags={this.props.tags} />
              <ProfessionalExperienceList editable={this.props.editable} user={this.props.user} experiences={this.props.user.profile.professionalExperiences}/>
            </div>
            <div style={styles.columnTwo}>
              <UserProfileButtons user={this.props.user}/>
              <Summary editable={this.props.editable} user={this.props.user} />
              <VolunteerExperienceList editable={this.props.editable} user={this.props.user} experiences={this.props.user.profile.volunteerExperiences}/>
            </div>
          </div>
        </div>
      )
    }
  }
}

UserPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired
}

export default UserPage
