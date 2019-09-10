import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  rented: false,
  rentModalIsOpen: false,
  snackbarMsg: '',
  toDateDisabled: true,
  fromDate: '',
  toDate: '',
  display: 'none',
  alert: '',
  totalPrice: 0,
}

const updateTotalPrice = (state, action) => {
  console.log(state)
  if (state.fromDate !== '' && action.toDate !== '') {
    let start = new Date(state.fromDate)
    let end = new Date(action.toDate)
    let diff = end - start
    let days = 1000 * 60 * 60 * 24

    if (Math.floor(diff / days) > 0) {
      let newState = {
        ...state,
        totalPrice: Math.floor(diff / days) * action.pricePerday,
        alert: '',
        display: 'none',
      }
      return newState
    } else if (Math.floor(diff / days) === 0) {
      let newState = {
        ...state,
        totalPrice: action.pricePerday,
        alert: '',
        display: 'none',
      }
      return newState
    } else {
      let newState = {
        ...state,
        totalPrice: 'error',
        alert:
          'wrong date (To) field should be greater than or equal to (From) field',
        display: 'block',
      }
      return newState
    }
  } else {
    return state
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        rented: false,
        snackbarMsg: '',
        fromDate: '',
        toDateDisabled: true,
      }
    case actionTypes.RENT_CAR_START:
      return {
        ...state,
        rented: false,
        loading: true,
        snackbarMsg: '',
        display: 'none',
        alert: '',
      }
    case actionTypes.RENT_CAR_SUCCESS:
      return {
        ...state,
        loading: false,
        rented: true,
        rentModalIsOpen: false,
        snackbarMsg: action.snackbarMsg,
      }
    case actionTypes.RENT_CAR_FAIL:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.RENT_TOGGLE_MODAL:
      return {
        ...state,
        rentModalIsOpen: !state.rentModalIsOpen,
        display: 'none',
        alert: '',
        totalPrice: 0,
        toDate: '',
        fromDate: '',
        toDateDisabled: true,
      }
    case actionTypes.RENT_CAR_FAIL:
      return {
        ...state,
        snackbarMsg: '',
      }
    case actionTypes.FROM_DATE:
      return {
        ...state,
        fromDate: action.fromDate,
        toDateDisabled: action.toDateDisabled,
      }
    case actionTypes.TO_DATE:
      const newState = updateTotalPrice(state, action)
      return {
        ...state,
        toDate: action.toDate,
        display: action.display,
        alert: action.alert,
        totalPrice: newState.totalPrice,
        alert: newState.alert,
        display: newState.display,
      }
    case actionTypes.RENT_HANDLER_ERROR:
      return {
        ...state,
        display: 'block',
        alert: action.alert,
      }
    default:
      return state
  }
}

export default reducer
