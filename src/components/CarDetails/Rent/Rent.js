import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import SnackBar from '@material-ui/core/Snackbar'
import classes from './Rent.module.css'
import ThickMark from '../../../assets/images/thick mark.png'
import FailedMark from '../../../assets/images/failedMark.jpg'
import * as actions from '../../../store/actions/index'

class Rent extends Component {
  state = {
    confirmationModalIsOpen: false,
    display: 'none',
    snackbarOpen: true,
    confirmRedirect: false,
    redirect: '',
  }

  snackbarClose = () => {
    this.setState({ snackbarOpen: false })
    this.props.onCloseSnackbar()
  }

  confirmationToggleModal = () => {
    this.setState({
      confirmationModalIsOpen: !this.state.confirmationModalIsOpen,
    })
  }

  confirmHandler = () => {
    const order = {
      fromDate: this.props.fromDate,
      toDate: this.props.toDate,
      price: this.props.totalPrice,
      carName: this.props.carName,
      userId: this.props.userId,
    }

    this.props.onRentCar(this.props.token, order)
    this.setState({
      totalPrice: 0,
      confirmationModalIsOpen: false,
      snackbarOpen: true,
    })
  }

  cancelHandler = () => {
    this.setState({
      confirmationModalIsOpen: false,
    })
  }

  rentHandler = () => {
    let dateObj = new Date()
    let month = dateObj.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }

    let day = dateObj.getDate()
    if (day < 10) {
      day = '0' + day
    }

    let year = dateObj.getFullYear()
    let date = year + '-' + month + '-' + day

    if (this.props.fromDate !== '' && this.props.toDate !== '') {
      if (this.props.fromDate <= this.props.toDate) {
        if (this.props.fromDate >= date) {
          this.confirmationToggleModal()
        } else {
          this.props.onRentHandlerError(
            "From field shouldn't be less than today's date!!!"
          )
        }
      } else {
        this.props.onRentHandlerError(
          'From field should be less than or equal To Field'
        )
      }
    } else if (this.props.fromDate === '' && this.props.toDate === '') {
      this.props.onRentHandlerError('You should fill the two fields')
    } else if (this.props.fromDate === '') {
      this.props.onRentHandlerError('You should fill the (From) field')
    } else if (this.props.toDate === '') {
      this.props.onRentHandlerError('You should fill the (To) field')
    }
  }

  render() {
    let today = new Date()

    let confirmationModalIsOpen = true
    if (!this.props.rentModalIsOpen) {
      confirmationModalIsOpen = false
    }

    let snackbarMsg = (
      <div>
        {' '}
        <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        Something went wrong
      </div>
    )

    if (this.props.snackbarMsg === 'ThickMark') {
      snackbarMsg = (
        <div>
          {' '}
          <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
          Order Successfully Placed
        </div>
      )
    }

    return (
      <div>
        <SnackBar
          className={classes.SnackBar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.snackbarOpen && this.props.isRented}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{snackbarMsg}</span>}
        />

        <button
          style={{
            borderRadius: '10px',
            float: 'right',
            backgroundColor: 'black',
            outline: 'none',
            width: '100px',
            textDecoration: 'underline',
            color: 'white',
          }}
          onClick={() => this.props.onRentToggleModal()}
        >
          RENT
        </button>

        <Modal
          isOpen={this.props.rentModalIsOpen}
          className="modal-dialog-centered"
          toggle={() => this.props.onRentToggleModal()}
        >
          <ModalHeader
            toggle={() => this.props.onRentToggleModal()}
            style={{ borderBottom: '0.5px solid rgba(169, 169, 169, .5)' }}
            cssModule={{ 'modal-title': 'w-100 text-center' }}
            className={classes.modalHeader}
          >
            <p
              className="modal-title"
              style={{ fontSize: '30px', textDecoration: 'underline' }}
            >
              Rent a Car
            </p>
          </ModalHeader>

          <ModalBody className="container">
            <label>From</label>

            <form className="form-inline ">
              <input
                type="date"
                name="FromDate"
                max="3000-12-31"
                min={
                  today.getFullYear +
                  '-' +
                  (today.getMonth + 1) +
                  '-' +
                  today.getDate
                }
                style={{
                  border: '2px solid black',
                  borderRadius: '10px',
                  padding: '3px',
                  marginTop: '-7px',
                  outline: 'none',
                }}
                className={classes.dateWidth}
                onChange={event => this.props.onFromDate(event)}
              />
            </form>

            <label style={{ marginTop: '10px' }}>To</label>
            <form className="form-inline ">
              <input
                type="date"
                name="ToDate"
                max="3000-12-31"
                min={
                  today.getFullYear +
                  '-' +
                  (today.getMonth + 1) +
                  '-' +
                  today.getDate
                }
                style={{
                  border: '2px solid black',
                  borderRadius: '10px',
                  padding: '3px',
                  marginTop: '-7px',
                  outline: 'none',
                }}
                className={classes.dateWidth}
                onChange={event =>
                  this.props.onToDate(event, this.props.pricePerday)
                }
                disabled={this.props.toDateDisabled}
              />
            </form>

            <div
              style={{ display: 'block' }}
              className={classes.floatTotalPrice}
            >
              <span>
                <strong>Total Cost:</strong>{' '}
              </span>
              <label
                className="rounded"
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  textAlign: 'center',
                  border: '1px solid black',
                }}
              >
                <strong> {this.props.totalPrice} $</strong>
              </label>
            </div>
          </ModalBody>

          <ModalFooter>
            <div
              className="alert alert-warning"
              style={{ display: this.props.display, margin: 'auto' }}
            >
              <strong>Warning!</strong> {this.props.alert}
            </div>
            <Button color="danger" onClick={this.rentHandler}>
              Rent
            </Button>
          </ModalFooter>
        </Modal>

        {/*///////////////////// */}
        <Modal
          isOpen={this.state.confirmationModalIsOpen && confirmationModalIsOpen}
          className="modal-dialog-centered"
          toggle={this.confirmationToggleModal}
        >
          <ModalBody className="container">
            <p>Confirm your order</p>
          </ModalBody>

          <ModalFooter>
            <div
              className="alert alert-warning"
              style={{ display: this.props.display, margin: 'auto' }}
            >
              <strong>Warning!</strong> {this.props.alert}
            </div>
            <button
              className="btn btn-outline-success "
              onClick={this.cancelHandler}
            >
              Cancel
            </button>
            <Button
              color="success"
              onClick={this.confirmHandler}
              disabled={this.props.isLoading}
            >
              {this.props.isLoading && (
                <i
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></i>
              )}
              {this.props.isLoading && <span> Loading...</span>}
              {!this.props.isLoading && <span> Confirm</span>}
            </Button>
          </ModalFooter>
        </Modal>

        {/* {redirect} */}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    userId: state.authReducer.userId,
    isRented: state.rentCarReducer.rented,
    isLoading: state.rentCarReducer.loading,
    rentModalIsOpen: state.rentCarReducer.rentModalIsOpen,
    snackbarMsg: state.rentCarReducer.snackbarMsg,
    fromDate: state.rentCarReducer.fromDate,
    toDateDisabled: state.rentCarReducer.toDateDisabled,
    toDate: state.rentCarReducer.toDate,
    totalPrice: state.rentCarReducer.totalPrice,
    alert: state.rentCarReducer.alert,
    display: state.rentCarReducer.display,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRentCar: (token, order) => dispatch(actions.rentCar(token, order)),
    onCarDetails: () => dispatch(actions.carDetailsInit()),
    onRentToggleModal: () => dispatch(actions.rentToggleModal()),
    onCloseSnackbar: () => dispatch(actions.closeSnackbar()),
    onFromDate: event => dispatch(actions.fromDateOnChangeHandler(event)),
    onToDate: (event, pricePerday) =>
      dispatch(actions.toDateOnChangeHandler(event, pricePerday)),
    onRentHandlerError: alert => dispatch(actions.rentHandlerError(alert)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Rent)
