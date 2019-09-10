import * as actionTypes from './actionTypes';

import { remove, get } from '../../httpService/httpService';

export const deleteCarToggleModal = () => {
    return {
        type: actionTypes.DELETE_CAR_TOGGLE_MODAL
    };
};

export const closeSnackbarDeleteCar = () => {
    return {
        type: actionTypes.CLOSE_SNACKBAR
    };
};

export const deleteCarFail = () => {
    return {
        type: actionTypes.DELETE_CAR_FAIL
    };
};

export const deleteCarStart = () => {
    return {
        type: actionTypes.DELETE_CAR_START
    }
}

export const deleteCarSuccess = () => {
    return {
        type: actionTypes.DELETE_CAR_SUCCESS
    }
}

export const deleteCar = (carID) => {


    return dispatch => {
        dispatch(deleteCarStart());
        const queryParams = `&orderBy="CarID"&equalTo=${carID}`;
        get('/CarsList.json', queryParams)
            .then(res => {

                remove(`CarsList/${Object.keys(res.data)[0]}.json`)
                    .then( () =>  dispatch(deleteCarSuccess()))
                    .catch( () => dispatch(deleteCarFail()))

               
                // this.setState({
                //     deleteCarModalIsOpen: false,
                //     isLoadingButtonSpinner: false,
                //     snackbarOpen: true,
                //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />  Deleted successfully</div>
                // })

                // setTimeout(() => {
                //     this.setState({ redirect: <Redirect to="/" /> })
                // }, 3000)
            }).catch(err => {
                // this.setState({
                //     deleteCarModalIsOpen: false,
                //     isLoadingButtonSpinner: false,
                //     snackbarOpen: true,
                //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />  Something went wrong</div>
                // })
                dispatch(deleteCarFail())
            })
    }
}