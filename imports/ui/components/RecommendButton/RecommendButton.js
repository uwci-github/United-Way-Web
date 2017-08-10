import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor'
import { FlatButton, RaisedButton, Popover, Snackbar, DropDownMenu, MenuItem } from 'material-ui'
import DropDownArrow from 'material-ui/svg-icons/navigation/arrow-drop-down'
import Loading from '/imports/ui/components/Loading'
import _ from 'lodash'

class RecommendButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      note: '',
      selectedPosition: -1, // place holder text has a value of -1
      snackbarOpen: false
    };
  }

  handleOpenDropDown(event) {

    event.preventDefault()

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });

  }

  handleRequestClose() {
    this.setState({
      open: false,
      note: ''
    })
  }

  handleSnackbarOpen() {
    this.setState({
      snackbarOpen: true
    })
  }

  handleSnackbarClose() {
    this.setState({
      snackbarOpen: false
    })
  }

  handleNoteChange(event) {
    this.setState({note: event.target.value})
  }

  handleSelectPosition(event, index, positionId) {
    this.setState({selectedPosition: positionId})
  }

  handleRecommend() {
    // TODO: add new post method
    console.log('recommend this person!');
    console.log(this.props);

    // const positionId = this.props.position._id
    //
    // if (this.props.currentUser._id) {
    //   const opts = {userId: this.props.currentUser._id, note: this.state.note}
    //   console.log('add method for recommend')
    //   Meteor.call('Positions.expressInterest', positionId, opts,
    //       (err, res) => {
    //         if (err) {
    //           console.log("Oh darn");
    //           alert(err)
    //         } else {
    //           this.handleSnackbarOpen()
    //         }
    //       })
    // }
  }

  render() {
    if (this.props.loading) {
      return <Loading/>
    } else {

      if (!this.props.isOrgAdmin) {
        return <div></div>
      }

      const labelText = 'RECOMMEND'
      const dropDownArrow = <DropDownArrow style={{...styles.label.content, ...styles.label.icon}}/>

      const label = <div style={styles.label}>
        <span style={styles.label.content}>{labelText}</span>
        {dropDownArrow}
      </div>

      const positionMenuItems = this.props.positions.length === 0 ?
          <MenuItem value={0} primaryText="No positions available."/> :
          this.props.positions.map((p) => {
            return <MenuItem key={p._id} value={p._id} primaryText={p.name}/>
          });


      const positionDropDown = <DropDownMenu
          value={this.state.selectedPosition}
          onChange={this.handleSelectPosition.bind(this)}
          autoWidth={false}
          style={styles.positionDropDown}>
          <MenuItem value={-1} primaryText="Choose a position from your organizations to recommend..."/>
          {positionMenuItems}
      </DropDownMenu>

      return (
          <div>
            <FlatButton
                children={label}
                style={styles.button.style}
                backgroundColor={styles.button.backgroundColor}
                onTouchTap={this.handleOpenDropDown.bind(this)}
            />
            <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                onRequestClose={this.handleRequestClose.bind(this)}
            >
              <div style={styles.dropDown}>
              <textarea style={styles.dropDown.note} type="text" value={this.state.note}
                        onChange={this.handleNoteChange.bind(this)}/>

                {positionDropDown}

                <div style={styles.dropDown.helperText}>You can choose to send a note later in
                  <span style={styles.dropDown.boldHelperText}> My Activity</span>
                </div>
                <div style={styles.dropDown.buttonContainer}>
                  <RaisedButton
                      label="RECOMMEND"
                      labelStyle={styles.dropDown.button.label}
                      style={styles.dropDown.button}
                      onTouchTap={this.handleRecommend.bind(this)}
                  />
                  <RaisedButton
                      label="CANCEL"
                      labelStyle={styles.dropDown.button.label}
                      style={styles.dropDown.button}
                      onTouchTap={this.handleRequestClose.bind(this)}
                  />
                </div>
              </div>
            </Popover>
            <Snackbar
                open={this.state.snackbarOpen}
                message="Thank you for sending your interest. It is up to the organization to contact you directly in return."
                autoHideDuration={4000}
                onRequestClose={this.handleSnackbarClose.bind(this)}
            />
          </div>
      )
    }
  }
}

RecommendButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  isOrgAdmin: PropTypes.bool.isRequired,
  positions: PropTypes.array.isRequired,
}

export default RecommendButton

const styles = {
  label: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    content: {
      color: '#ffffff',
      fontSize: '12px',
      fontWeight: '500',
    },

    icon: {
      margin: '0 0 0 8px',
      fontSize: '20px',
      height: '20px',
      width: '20px',
    }
  },

  button: {
    backgroundColor: '#0277bd',

    style: {
      width: '100%',
      height: '32px',
      lineHeight: '1.5'
    },

    disabled: {
      opacity: '0.3'
    }
  },

  dropDown: {
    width: '300px',
    height: '200px',
    backgroundColor: '#0277bd',
    padding: '16px',

    note: {
      resize: 'none',
      width: 'calc(100% - 16px)',
      height: '72px',
      padding: '8px',
      border: '0',
    },

    helperText: {
      color: '#ffffff',
      fontSize: '12px',
      margin: '0 0 16px 0',
    },

    boldHelperText: {
      fontWeight: 'bold',
    },

    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },

    button: {
      margin: '0 0 0 16px',
      height: '24px',

      label: {
        color: '#0277bd',
        lineHeight: '24px',
        fontSize: '12px',
        fontWeight: '500',
        textAlign: 'center'
      }
    }
  },

  positionDropDown: {
    width: '100%',
  }
}