import * as actionTypes from '../actions/actionTypes';

const initialState = {
    imgURL: '',
    userName: ''
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.NAVIGATIONITEMS:
            return {
                ...state,
                userName: action.userName,
                imgURL: action.imgURL
            }
        default:
            return state;
    }
}

export default reducer;