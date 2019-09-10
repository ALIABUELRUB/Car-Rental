import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import asyncComponent from '../../hoc/asyncComponent/asyncComponent'

import Navigationbar from '../NavigationBar/NavigationBar'
import CarsListContainer from '../CarsList/CarsListContainer'
import History from '../History/History'
import CarDetails from '../CarDetails/CarDetails'
import Logout from '../../containers/Auth/Logout/Logout'

const asyncHistory = asyncComponent(() => {
  return import('../History/History')
})

const asyncCarsListContainer = asyncComponent(() => {
  return import('../CarsList/CarsListContainer')
})

const user = props => {
  let isAdmin = null
  if (localStorage.getItem('email') === 'admin@admin.com') {
    isAdmin = 'admin'
  }

  return (
    <div>
      <Navigationbar>
        <Switch>
          <Route
            path="/User/History"
            exact
            render={() => <asyncHistory admin={isAdmin} />}
          />
          <Route
            path="/User/CarsList/CarDetails"
            exact
            component={CarDetails}
          />
          <Route path="/logout" component={Logout} />
          <Route
            path="/"
            exact
            render={() => <CarsListContainer admin={isAdmin} />}
          />
          {props.state.authReducer.token !== null ? <Redirect to="/" /> : null}
        </Switch>
      </Navigationbar>
    </div>
  )
}

export default user
