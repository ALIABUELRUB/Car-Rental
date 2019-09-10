import * as actionTypes from '../actions/actionTypes';

const initialState = {
    carsList: [],
    loading: false
};


const reducer = (state = initialState, action) => {
    
    switch (action.type) {

        case actionTypes.FETCH_CARS_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_CARS_SUCCESS:
            return {
                ...state,
                carsList: action.cars,
                loading: false
            };
            case actionTypes.FETCH_CARS_FAIL:
                return {
                    ...state,
                    loading: false
                }
        default:
            return state;
    }
}

export default reducer;