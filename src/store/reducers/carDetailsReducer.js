import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  exteriorImagesURL: [],
  interiorImagesURL: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CAR_DETAILS_START:
      return {
        ...state,
        loading: false,
      }
    case actionTypes.EXTERIOR_IMAGES:
      return {
        ...state,
        exteriorImagesURL: action.exteriorImagesURL,
      }
    case actionTypes.INTERIOR_IMAGES:
      return {
        ...state,
        interiorImagesURL: action.interiorImagesURL,
      }
    default:
      return state
  }
}

export default reducer
