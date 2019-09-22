//////
import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Route, Redirect, Switch } from 'react-router-dom'
import Navigationbar from './components/NavigationBar/NavigationBar'
import Logout from './containers/Auth/Logout/Logout'
import Signin from './containers/Auth/Auth'
import * as actions from './store/actions/index'
import { post } from './httpService/httpService'
const asyncSignUp = React.lazy(() => import('./containers/Auth/SignUp/SignUp'))
const asyncHistory = React.lazy(() => import('./components/History/History'))
const asyncCarsListContainer = React.lazy(() =>
  import('./components/CarsList/CarsListContainer')
)
const asyncCarDetails = React.lazy(() =>
  import('./components/CarDetails/CarDetails')
)
class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup()
  }
  componentDidUpdate = () => {
    console.log(localStorage.getItem('token') + ' :token')
    if (
      localStorage.getItem('token') !== null &&
      localStorage.getItem('imgName') !== null
    ) {
      const userInfo = {
        imgName: localStorage.getItem('imgName'),
        userId: localStorage.getItem('userId'),
        name: `${localStorage.getItem('firstName')} ${localStorage.getItem(
          'lastName'
        )}`,
      }
      post('/UserInfo.json', userInfo)
        .then(response => localStorage.removeItem('imgName'))
        .catch(err => console.log(err))
    }
  }
  render() {
    let isAdmin = null
    if (localStorage.getItem('email') === 'admin@admin.com') {
      isAdmin = 'admin'
    }
    let routes = (
      <Switch>
        <Route path="/SignUp" exact component={asyncSignUp} />
        <Route path="/" exact component={Signin} />
      </Switch>
    )
//////
    if (this.props.isAuthorized) {
      routes = (
        <Navigationbar>
          <Switch>
            <Route path="/User/History" exact component={asyncHistory} />
            <Route
              path="/User/CarsList/CarDetails"
              exact
              component={asyncCarDetails}
            />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={asyncCarsListContainer} />
            {this.props.token !== null ? <Redirect to="/" /> : null}
          </Switch>
        </Navigationbar>
      )
    }

    return (
      <React.Suspense fallback={<div>loading...</div>}>
        <div>{routes}</div>
      </React.Suspense>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthorized: state.authReducer.token !== null,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    state: state,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
)
