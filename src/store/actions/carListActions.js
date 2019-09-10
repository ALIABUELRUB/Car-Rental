import * as actionTypes from './actionTypes'

import { storage } from '../../FirebaseStorage/FirebaseStorage'
import { get } from '../../httpService/httpService'

export const fetchCarsSuccess = cars => {
  return {
    type: actionTypes.FETCH_CARS_SUCCESS,
    cars: cars,
  }
}

export const fetchCarsFail = error => {
  return {
    type: actionTypes.FETCH_CARS_FAIL,
    error: error,
  }
}
export const fetchCarsStart = () => {
  return {
    type: actionTypes.FETCH_CARS_START,
  }
}

export const fetchCars = () => {
  return dispatch => {
    dispatch(fetchCarsStart())
    get('/CarsList.json')
      .then(response => {
        const fetchCars = []

        for (let key in response.data) {
          storage
            .ref('carImages/')
            .child(response.data[key].ImgName)
            .getDownloadURL()
            .then(url => {
              localStorage.setItem(key, url)
            })
        }

        for (let key in response.data) {
          fetchCars.push({
            ...response.data[key],
            id: key,
            imgURL: localStorage.getItem(key),
          })
        }
        dispatch(fetchCarsSuccess(fetchCars))
      })
      .catch(error => {
        dispatch(fetchCarsFail(error))
      })
  }
}
