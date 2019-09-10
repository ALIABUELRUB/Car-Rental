import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './History.module.css'
import * as historyActions from '../../store/actions/index'

class History extends Component {
  componentDidMount = () => {
    console.log(localStorage.getItem('isAdmin'))
    this.props.onHistory(
      localStorage.getItem('isAdmin'),
      this.props.token,
      this.props.userId
    )
  }

  render() {
    return (
      <div className={[classes.History, 'overflow-auto'].join(' ')}>
        <div className={'table-responsive'} style={{ height: '400px' }}>
          <table className={'table  table-dark table-hover table-striped'}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Car</th>
                <th>From</th>
                <th>To</th>
                <th>Total($)</th>
              </tr>
            </thead>

            <tbody>
              {this.props.history.map((history, i) => {
                return (
                  <tr key={i}>
                    <td>{history.userId}</td>
                    <td style={{ textTransform: 'capitalize' }}>
                      {history.carName}
                    </td>
                    <td>{history.fromDate}</td>
                    <td>{history.toDate}</td>
                    <td>${history.price}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {this.props.spinnerIsLoading ? (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border text-primary"
                style={{ width: '3rem', height: '3rem' }}
                role="status"
              ></div>{' '}
            </div>
          ) : null}

          {this.props.history.length === 0 && !this.props.spinnerIsLoading ? (
            <p style={{ textAlign: 'center' }}>
              <strong>Empty History</strong>
            </p>
          ) : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    spinnerIsLoading: state.historyReducer.spinnerIsLoading,
    history: state.historyReducer.history,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onHistory: (isAdmin, token, userID) =>
      dispatch(historyActions.history(isAdmin === 'true', token, userID)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(History)
