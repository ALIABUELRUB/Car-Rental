import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingButtonSpinner: false,
    snackbarOpen: false,
    snackbarMsg: '',
    altSnackBarImg: '',
    deleteCarModalIsOpen: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.DELETE_CAR_TOGGLE_MODAL:
            return {
                ...state,
              deleteCarModalIsOpen: !state.deleteCarModalIsOpen
            }
        case actionTypes.CLOSE_SNACKBAR:
            return {
                snackbarOpen: false
            }
        case actionTypes.DELETE_CAR_START:
            return {
                ...state,
                isLoadingButtonSpinner: true,
                snackbarOpen: false,
                snackbarMsg: '',
                altSnackBarImg: ''
            };
        case actionTypes.DELETE_CAR_FAIL:
            return {
                ...state,
                isLoadingButtonSpinner: false,
                snackbarOpen: true,
                snackbarMsg: "Something went wrong",
                altSnackBarImg: "Failed Mark",
                deleteCarModalIsOpen: false
            }
        case actionTypes.DELETE_CAR_SUCCESS:
            return {
                ...state,
                isLoadingButtonSpinner: false,
                snackbarOpen: true,
                snackbarMsg: "Deleted successfully",
                altSnackBarImg: "Thick Mark",
                deleteCarModalIsOpen: false
            };
        default:
            return state;
    }
}

export default reducer;