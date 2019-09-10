import * as actionTypes from './actionTypes';
import { post, get, put } from '../../httpService/httpService';

export const rentCarSuccess = () => {

    return {
        type: actionTypes.RENT_CAR_SUCCESS,
        snackbarMsg: "ThickMark"
    };
};

export const rentCarFail = () => {

    return {
        type: actionTypes.RENT_CAR_FAIL
    };
};

export const rentCarStart = () => {

    return {
        type: actionTypes.RENT_CAR_START
    };
};

export const rentCar = (token, order) => {

    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem("carID")}`;

    return dispatch => {

        dispatch(rentCarStart());

        get(`/CarsList.json`, queryParams)
            .then(res => {
                put(`/CarsList/${Object.keys(res.data)[0]}/disabled.json`, true)
                    .then(res => console.log(res))
                    .catch(err => dispatch(rentCarFail()))
            })

        post('/rent.json', order)
            .then(response =>
                console.log(response),
                dispatch(rentCarSuccess())
                // this.setState({
                //     confirmationModalIsOpen: false,
                //     rentModalIsOpen: false,
                //     snackbarOpen: true,
                //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />  Order Successfully Placed</div>,
                //     isLoading: false
                // }),
                // setTimeout(() => {
                //     this.setState({redirect: <Redirect to="/" />})
                // },  3000)

            ).catch(err =>
                console.log(err),
                dispatch(rentCarFail())
                // this.setState({
                //     confirmationModalIsOpen: false,
                //     rentModalIsOpen: false,
                //     showAlertSuccess: false,
                //     showAlertError: true,
                //     snackbarOpen: true,
                //     snackbarMsg: <div>  <img src={FailedMark} alt="Thick Mark" width="20px" height="20px" />  Something went wrong</div>,
                //     isLoading: false
                // })
            );


    }
}

export const rentToggleModal = () => {
    return {
        type: actionTypes.RENT_TOGGLE_MODAL
    };
};

export const closeSnackbar = () => {
    return {
        type: actionTypes.CLOSE_SNACKBAR
    };
};

export const fromDateOnChangeHandler = (event) => {
    if (event.target.value !== "") {
        return {
            type: actionTypes.FROM_DATE,
            fromDate: event.target.value,
            toDateDisabled: false
        }
    } else if (event.target.value === "") {
        return {
            type: actionTypes.FROM_DATE,
            fromDate: event.target.value,
            toDateDisabled: true
        }
    }
}

export const updateTotalPrice = (value) => {

    return {
        type: actionTypes.UPDATE_TOTAL_PRICE,
        toDate: value
    };
};

export const toDateOnChangeHandler = (event, pricePerday) => {
    console.log(pricePerday)
    if (event.target.value !== "") {
        return {
            type: actionTypes.TO_DATE,
            toDate: event.target.value,
            display: "none",
            alert: "",
            pricePerday: pricePerday
        }

    } else if (event.target.value === "") {
        return {
            type: actionTypes.TO_DATE,
            toDate: event.target.value
        }
    }

}

export const rentHandlerError = (alert) => {

    return {
        type: actionTypes.RENT_HANDLER_ERROR,
        alert: alert
    }
}