import * as actionTypes from '../actions/actionTypes'

const initialState = {
  carImage: '',
  exteriorImagesFileName: [],
  exteriorImagesFileNameLength: 0,
  interiorImagesFileName: [],
  interiorImagesFileNameLength: 0,
  carName: '',
  carNameEdit: '',
  pricePerday: 0,
  pricePerdayEdit: 0,
  bodyType: '',
  bodyTypeEdit: '',
  class: '',
  classEdit: '',
  engine: '',
  engineEdit: '',
  horsePower: '',
  horsePowerEdit: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CAR_IMAGE:
      return {
        ...state,
        carImage: action.carImage,
      }
    case actionTypes.SET_CAR_NAME:
      return {
        ...state,
        carName: action.carName,
        carNameEdit: action.carName,
      }
    case actionTypes.SET_NEW_CAR_NAME:
      return {
        ...state,
        carNameEdit: action.newCarName,
      }
    case actionTypes.SET_PRICE_PERDAY: {
      return {
        ...state,
        pricePerday: action.pricePerday,
        pricePerdayEdit: action.pricePerday,
      }
    }
    case actionTypes.SET_NEW_PRICE_PERDAY:
      return {
        ...state,
        pricePerdayEdit: action.newPricePerday,
      }
    case actionTypes.NEW_INTERIOR_IMAGES:
      return {
        ...state,
        interiorImagesFileName: action.newInteriorImages,
      }
    case actionTypes.NEW_EXTERIOR_IMAGES:
      return {
        ...state,
        exteriorImagesFileName: action.newExteriorImages,
      }
    case actionTypes.SET_EXTERIOR_IMAGES:
      return {
        ...state,
        exteriorImagesFileName: action.exteriorImagesFileName,
        exteriorImagesFileNameLength: action.exteriorImagesFileName.length,
      }
    case actionTypes.SET_INTERIOR_IMAGES:
      return {
        ...state,
        interiorImagesFileName: action.interiorImagesFileName,
        interiorImagesFileNameLength: action.interiorImagesFileName.length,
      }
    case actionTypes.NEW_EXTERIOR_IMAGES_FILE_NAME_LENGTH:
      return {
        ...state,
        exteriorImagesFileNameLength: action.newExteriorImagesFileNameLength,
      }
    case actionTypes.NEW_INTERIOR_IMAGES_FILE_NAME_LENGTH:
      return {
        ...state,
        interiorImagesFileNameLength: action.newInteriorImagesFileNameLength,
      }
    case actionTypes.SET_BODY_TYPE:
      return {
        ...state,
        bodyType: action.bodyType,
        bodyTypeEdit: action.bodyType,
      }
    case actionTypes.SET_NEW_BODY_TYPE:
      return {
        ...state,
        bodyTypeEdit: action.newBodyType,
      }
    case actionTypes.SET_CLASS:
      return {
        ...state,
        class: action.class,
        classEdit: action.class,
      }
    case actionTypes.SET_NEW_CLASS:
      return {
        ...state,
        classEdit: action.newClass,
      }
    case actionTypes.SET_ENGINE:
      return {
        ...state,
        engine: action.engine,
        engineEdit: action.engine,
      }
    case actionTypes.SET_NEW_ENGINE:
      return {
        ...state,
        engineEdit: action.newEngine,
      }
    case actionTypes.SET_HORSE_POWER:
      return {
        ...state,
        horsePower: action.horsePower,
        horsePowerEdit: action.horsePower,
      }
    case actionTypes.SET_NEW_HORSE_POWER:
      return {
        ...state,
        horsePowerEdit: action.newHorsePower,
      }
    default:
      return state
  }
}

export default reducer
