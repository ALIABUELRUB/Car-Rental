import axios from 'axios'

import * as actionTypes from './actionTypes'

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('expirationDate')
  localStorage.removeItem('userId')
  localStorage.removeItem('carDescription')
  localStorage.removeItem('aboutProps')
  localStorage.removeItem('imgURL')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
  localStorage.removeItem('email')
  localStorage.removeItem('class')
  localStorage.removeItem('carID')
  localStorage.removeItem('bodyType')
  localStorage.removeItem('engine')
  localStorage.removeItem('NoOfCars')
  localStorage.removeItem('horsePower')
  localStorage.removeItem('isAdmin')
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 3000)
  }
}

export const auth = (email, password, url) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    localStorage.setItem('email', email)
    console.log(email)
    console.log(password)

    axios
      .post(url, authData)
      .then(response => {
        console.log(response)
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        )
        localStorage.setItem('token', response.data.idToken)
        localStorage.setItem('expirationDate', expirationDate)
        localStorage.setItem('userId', response.data.localId)
        localStorage.setItem('carsList', true)
        localStorage.setItem('history', false)
        dispatch(authSuccess(response.data.idToken, response.data.localId))
        dispatch(checkAuthTimeout(response.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err.response.data.error))
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        )
      }
    }
  }
}
