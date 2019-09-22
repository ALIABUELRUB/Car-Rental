import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import authReducer from './store/reducers/authReducer'
import 'bootstrap/dist/css/bootstrap.css'
import * as serviceWorker from './serviceWorker'
import carsListReducer from './store/reducers/carListReducer'
import carDetailsReducer from './store/reducers/carDetailsReducer'
import historyReducer from './store/reducers/historyReducer'
import navigationItemsReducer from './store/reducers/NavigationItemsReducer'
import rentCarReducer from './store/reducers/rentCarReducer'
import deleteCarReducer from './store/reducers/deleteCarReducer'
import editCarReducer from './store/reducers/editCarReducer'

let composeEnhancers = compose
if (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}

const rootReducer = combineReducers({
  authReducer: authReducer,
  carsList: carsListReducer,
  carDetails: carDetailsReducer,
  historyReducer: historyReducer,
  navigationItems: navigationItemsReducer,
  rentCarReducer: rentCarReducer,
  deleteCarReducer: deleteCarReducer,
  editCarReducer: editCarReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
)

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
