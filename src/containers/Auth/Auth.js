import React, { Component } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, Media } from 'react-bootstrap'
import 'react-alice-carousel/lib/alice-carousel.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Background1 from '../../assets/images/LoginBackground1.jpg'
import Background2 from '../../assets/images/LoginBackground2.jpg'
import Background3 from '../../assets/images/LoginBackground3.jpg'
import classes from './Auth.module.css'
import UserNameIcon from '../../assets/images/usernameIcon.png'
import passwordIcon from '../../assets/images/passwordIcon.png'
import Logo from '../../assets/images/RentACarLogo2.png'
import LoginCarsList from './LoginCarsList/LoginCarsList'
import SpecialOffers from './SpecialOffers/SpecialOffers'
import MobileBackground1 from '../../assets/images/mobileBackground1.jpg'
import MobileBackground2 from '../../assets/images/mobileBackground2.jpg'
import MobileBackground3 from '../../assets/images/mobileBackground4.jpg'

class Login extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.props.onAuth(
      this.state.email,
      this.state.password,
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJp1EyiQm3CM-IQfl85-v8CqiSY0soulk'
    )

    this.setState({ isLoading: true })
  }

  render() {
    let loading = null

    if (this.props.loading) {
      loading = (
        <p className="text-white text-center">
          <strong>Loading...</strong>
        </p>
      )
    }

    let errorMessage = null

    if (this.props.error) {
      // console.log(this.props.error )
      errorMessage = (
        <p className="text-danger text-center">
          <strong>{this.props.error.message}</strong>
        </p>
      )
    }

    let form = (
      <div className={'card-body'}>
        {errorMessage}
        {loading}
        <div className={classes.cardHeader}>
          <h3>Sign In</h3>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className={'input-group form-group'}>
            <div className={classes.InputGroupPrepend}>
              <span className={'input-group-text'}>
                <img src={UserNameIcon} alt="userIcon" width="90%" />
              </span>
            </div>
            <input
              type="email"
              id="email"
              onChange={this.handleChange}
              className={'form-control'}
              placeholder="Email"
              required
            />
          </div>
          <div className={'input-group form-group'}>
            <div className={classes.InputGroupPrepend}>
              <span className={'input-group-text'}>
                <img src={passwordIcon} alt="passwordIcon" width="100%" />
              </span>
            </div>
            {/* <input type="password" className={"form-control"} placeholder="password" /> */}
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
              className={'form-control'}
              placeholder="password"
              required
            />
          </div>
          <div
            className={[classes.remember, 'row align-items-center'].join(' ')}
          ></div>
          <div className={'form-group'}>
            <button
              className={[
                classes.loginBtn,
                'btn btn-warning',
                'float-right',
              ].join(' ')}
              disabled={this.props.loading}
            >
              Login
            </button>
          </div>
        </form>
        <div className={['card-footer'].join(' ')}>
          <div className={classes.links}>
            Don't have an account?
            <Link to="/SignUp" style={{ textDecoration: 'underline' }}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    )

    console.log(this.props.token)
    return (
      <div>
        <Navbar bg="dark" expand="sm" style={{ height: '65px' }}>
          <Navbar.Brand>
            <Link to="/">
              <Media tag="a" className="nav-link" href="/">
                <img src={Logo} alt="CarLogo" height="40px" />
              </Media>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ height: '33px' }}
          />
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ backgroundColor: 'transparent' }}
            className={classes.zIndex}
          >
            <Nav className="ml-auto">
              <div className={'d-flex justify-content-center h-100'}>
                <div className={classes.transform}>
                  <div className={classes.cardToggle}>{form}</div>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={[classes.containerMain].join(' ')}>
          <Carousel
            showArrows={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            width="100%"
            dynamicHeight
            stopOnHover={false}
            transitionTime={2000}
            interval={7000}
          >
            <div>
              <picture>
                <source media="(max-width: 900px)" srcSet={MobileBackground1} />
                <img id="carouselImg" src={Background1} alt="Background1" />
              </picture>
            </div>

            <div>
              <picture>
                <source media="(max-width: 900px)" srcSet={MobileBackground3} />
                <img src={Background2} alt="Background2" />
              </picture>
            </div>

            <div>
              <picture>
                <source media="(max-width: 900px)" srcSet={MobileBackground2} />
                <img src={Background3} alt="Background3" />
              </picture>
            </div>
          </Carousel>

          <div
            className={[
              classes.centered,
              'container',
              classes.showLoginForm,
            ].join(' ')}
          >
            <div className={'d-flex justify-content-center h-100'}>
              <div className={classes.card}>{form}</div>
            </div>
          </div>
        </div>

        <SpecialOffers />

        <LoginCarsList />
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    token: state.authReducer.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, url) =>
      dispatch(actions.auth(email, password, url)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
