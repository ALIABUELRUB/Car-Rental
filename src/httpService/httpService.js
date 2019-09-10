import axios from '../axios';

import { store } from '../index';

export const get = (url, params) => {
    const reduxState = store.getState();
    return axios.get(`${url}?auth=${reduxState.authReducer.token}${params !== undefined ? params : ''}`)
}

export const put = (url, params) => {
    const reduxState = store.getState();
    return axios.put(`${url}?auth=${reduxState.authReducer.token}`, params)
}

export const post = (url, params) => {
    const reduxState = store.getState();
    return axios.post(`${url}?auth=${reduxState.authReducer.token}`, params)
}

export const remove = (url) => {
    const reduxState = store.getState();
    return axios.delete(`${url}?auth=${reduxState.authReducer.token}`)
}