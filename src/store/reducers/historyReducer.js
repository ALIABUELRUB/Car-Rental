import * as actionTypes from '../actions/actionTypes';

const initialState = {
    spinnerIsLoading: false,
    history: []
};

const reducer = (state = initialState, action) => {

    switch (action.type) {


        case actionTypes.HISTORY_START:
            return {
                ...state,
                spinnerIsLoading: true
            }
        case actionTypes.HISTORY_SUCCESS:
            return {
                ...state,
                spinnerIsLoading: false,
                history: action.history
            };
        case actionTypes.HISTORY_FAIL:
            return {
                ...state,
                spinnerIsLoading: false
            }
        default:
            return state;
    }
}

export default reducer;