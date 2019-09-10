import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import SnackBar from '@material-ui/core/Snackbar';
import classes from './DeleteCar.module.css';
import ThickMark from '../../../assets/images/thick mark.png';
import FailedMark from '../../../assets/images/failedMark.jpg';
import * as deleteCarActions from '../../../store/actions/index';

class DeleteCar extends Component {

    state = {
        redirect: ''
    }

    handleDeleteCar = () => {
        this.props.onDeleteCar(localStorage.getItem("carID"))
    }

    render() {

        return (
            <div>
                {this.state.redirect}
                <SnackBar
                    className={classes.SnackBar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={this.props.snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.props.onCloseSnackbar}
                    message={
                        <span id="message-id">

                            <div>
                                <img src={this.props.snackbarMsg === "Deleted successfully" ? ThickMark : FailedMark}
                                    alt={this.props.altSnackBarImg} width="20px" height="20px" />
                                {this.props.snackbarMsg}
                            </div>
                        </span>}
                />

                {/* /////////////////////////////////////////// */}
                <Modal isOpen={this.props.deleteCarModalIsOpen}

                    className="modal-dialog-centered" toggle={this.props.deleteCarToggleModal}>

                    <ModalHeader
                        style={{ borderBottom: "0.5px solid rgba(169, 169, 169, .5)" }}>
                        <strong>Delete Car</strong>
                    </ModalHeader>

                    <ModalBody className="container">

                        <div className="alert alert-warning"
                            style={{ display: this.state.display, margin: "auto" }}>
                            <strong>Are you sure you want to delete this car?</strong>
                        </div>

                    </ModalBody>



                    <ModalFooter>

                        <button className="btn btn-info"
                            onClick={this.props.onDeleteCarToggleModal} >Cancel</button>

                        <div >
                            <button className="btn btn-outline-warning" onClick={this.handleDeleteCar} disabled={this.props.isLoadingButtonSpinner}>
                                {this.props.isLoadingButtonSpinner && <i className="spinner-grow spinner-grow-sm" role="status"></i>}
                                {this.props.isLoadingButtonSpinner && <span> Deleting...</span>}
                                {!this.props.isLoadingButtonSpinner && <span> Confirm</span>}
                            </button>
                        </div>
                    </ModalFooter>

                </Modal>
                {/* ////////////////////// */}

                <button className={["btn btn-danger", classes.deleteCar].join(" ")}
                    onClick={this.props.onDeleteCarToggleModal}>
                    DELETE
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoadingButtonSpinner: state.deleteCarReducer.isLoadingButtonSpinner,
        snackbarOpen: state.deleteCarReducer.snackbarOpen,
        snackbarMsg: state.deleteCarReducer.snackbarMsg,
        altSnackBarImg: state.deleteCarReducer.altSnackBarImg,
        deleteCarModalIsOpen: state.deleteCarReducer.deleteCarModalIsOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteCar: (carID) => dispatch(deleteCarActions.deleteCar(carID)),
        onCloseSnackbar: () => dispatch(deleteCarActions.closeSnackbarDeleteCar()),
        onDeleteCarToggleModal: () => dispatch(deleteCarActions.deleteCarToggleModal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCar)