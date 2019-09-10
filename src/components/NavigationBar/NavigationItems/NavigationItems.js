import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { storage } from '../../../FirebaseStorage/FirebaseStorage'
import axios from '../../../axios'

import * as navigationActions from '../../../store/actions/index'
import classes from './NavigationItems.module.css'

class NavigationItems extends Component {
  state = {
    name: '',
    imgURL: '',
    active: true,
  }

  componentDidMount = () => {
    this.props.onNavigationItems(this.props.userId)
  }

  active = () => {
    this.setState({
      active: true,
    })
  }

  render() {
    return (
      <ul className={classes.NavigationItems}>
        <div className="col text-center">
          <img
            src={this.props.imgURL}
            style={{ borderRadius: '30px' }}
            alt="Avatarimg"
            height="38px"
            width="40px"
          />
          <span style={{ color: 'white', textTransform: 'capitalize' }}>
            {' '}
            {this.props.userName}
          </span>
        </div>

        <hr style={{ width: '100%', color: 'gray' }} />
        <li className={classes.NavigationItem}>
          <NavLink
            to="/User/CarsList"
            onClick={this.active}
            className={
              window.location.href === 'http://localhost:3000/User/CarsList' ||
              window.location.href === 'http://localhost:3000/'
                ? classes.active
                : null
            }
            style={{ textDecoration: 'none' }}
          >
            Cars List
          </NavLink>
        </li>
        <hr style={{ width: '200px', color: 'gray' }} />
        <li className={classes.NavigationItem}>
          <NavLink
            to="/User/History"
            onClick={this.active}
            className={
              window.location.href === 'http://localhost:3000/User/History'
                ? classes.active
                : null
            }
            style={{ textDecoration: 'none' }}
          >
            History
          </NavLink>
        </li>
        <hr style={{ width: '200px', color: 'gray' }} />
        <li className={classes.NavigationItem}>
          <NavLink to="/logout" style={{ textDecoration: 'none' }}>
            Logout
          </NavLink>
        </li>
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.authReducer.userId,
    imgURL: state.navigationItems.imgURL,
    userName: state.navigationItems.userName,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onNavigationItems: userID =>
      dispatch(navigationActions.navigationItemsInit(userID)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationItems)
