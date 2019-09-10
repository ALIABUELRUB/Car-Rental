import * as actionTypes from './actionTypes';
import { get } from '../../httpService/httpService';

export const historySuccess = (history) => {

    return {
        type: actionTypes.HISTORY_SUCCESS,
        history: history
    };
};

export const historyFail = () => {

    return {
        type: actionTypes.HISTORY_FAIL
    };
};

export const historyStart = () => {

    return {
        type: actionTypes.HISTORY_START
    };
};

export const history = (isAdmin, token, userID) => {

    return dispatch => {
        dispatch(historyStart());

        if (isAdmin) {

            get('/rent.json')
                .then(res => {
                    const history = [];

                    for(let key in res.data) {
                        history.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                 console.log(history)
                     dispatch(historySuccess(history))

                    // this.setState({
                    //     history: historyRes,
                    //     loading: false,
                    //     spinnerIsLoading: false
                    // })

                })
        } else {

            const queryParams = '&orderBy="userId"&equalTo="' + userID + '"';
            get('/rent.json', queryParams)
                .then(res => {
                    const history = [];

                    for(let key in res.data) {
                        history.push({
                            ...res.data[key],
                            id: key
                        });
                    }
                    console.log(history)
                     dispatch(historySuccess(history))

                    // this.setState({
                    //     history: historyRes,
                    //     loading: false,
                    //     spinnerIsLoading: false
                    // })
                })
        }
    }
}