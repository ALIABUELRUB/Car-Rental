import * as actionTypes from './actionTypes'

import { storage } from '../../FirebaseStorage/FirebaseStorage'
import { get, put } from '../../httpService/httpService'

export const setCarImage = imgURL => {
  return {
    type: actionTypes.SET_CAR_IMAGE,
    carImage: imgURL,
  }
}

export const deleteInteriorImage = newInteriorImages => {
  return {
    type: actionTypes.NEW_INTERIOR_IMAGES,
    newInteriorImages: newInteriorImages,
  }
}

export const deleteExteriorImage = newExteriorImages => {
  return {
    type: actionTypes.NEW_EXTERIOR_IMAGES,
    newExteriorImages: newExteriorImages,
  }
}

export const setExteriorImages = exteriorImagesFileName => {
  return {
    type: actionTypes.SET_EXTERIOR_IMAGES,
    exteriorImagesFileName: exteriorImagesFileName,
  }
}

export const setInteriorImages = interiorImagesFileName => {
  return {
    type: actionTypes.SET_INTERIOR_IMAGES,
    interiorImagesFileName: interiorImagesFileName,
  }
}

export const newInteriorImagesFileNameLength = newInteriorImagesFileNameLength => {
  return {
    type: actionTypes.NEW_INTERIOR_IMAGES_FILE_NAME_LENGTH,
    newInteriorImagesFileNameLength: newInteriorImagesFileNameLength,
  }
}

export const updateInteriorImagesInFirebase = newInteriorImages => {
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`

    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)
          put(`CarsList/${data}/InteriorImages.json`, newInteriorImages)
            .then(res => {
              console.log(res)
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        console.log(err)

        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const setNewPricePerday = newPricePerday => {
  return {
    type: actionTypes.SET_NEW_PRICE_PERDAY,
    newPricePerday: newPricePerday,
  }
}

export const setPricePerday = pricePerday => {
  return {
    type: actionTypes.SET_PRICE_PERDAY,
    pricePerday: pricePerday,
  }
}

export const updatePricePerdayInFirebase = newPricePerday => {
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`

    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)

          put(`/CarsList/${data}/PricePerday.json`, newPricePerday)
            .then(res => {
              console.log(res)

              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const newExteriorImagesFileNameLength = newExteriorImagesFileNameLength => {
  return {
    type: actionTypes.NEW_EXTERIOR_IMAGES_FILE_NAME_LENGTH,
    newExteriorImagesFileNameLength: newExteriorImagesFileNameLength,
  }
}

export const updateExteriorImagesInFirebase = newExteriorImages => {
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`
    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)
          put(`CarsList/${data}/ExteriorImages.json`, newExteriorImages)
            .then(res => {
              console.log(res)
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        console.log(err)

        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const setCarName = carName => {
  return {
    type: actionTypes.SET_CAR_NAME,
    carName: carName,
  }
}

export const setNewCarName = newCarName => {
  return {
    type: actionTypes.SET_NEW_CAR_NAME,
    newCarName: newCarName,
  }
}

export const updateCarNameInFirebase = newCarName => {
  console.log(newCarName)
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`
    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)

          put(`/CarsList/${data}/CarName.json`, `"${newCarName}"`)
            .then(res => {
              console.log(res)

              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const setBodyType = bodyType => {
  return {
    type: actionTypes.SET_BODY_TYPE,
    bodyType: bodyType,
  }
}

export const setNewBodyType = newBodyType => {
  return {
    type: actionTypes.SET_NEW_BODY_TYPE,
    newBodyType: newBodyType,
  }
}

export const updateBodyTypeInFirebase = newBodyType => {
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`

    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)

          put(`/CarsList/${data}/carDetails/bodyType.json`, `"${newBodyType}"`)
            .then(res => {
              console.log(res)

              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const setClass = carDetails => {
  return {
    type: actionTypes.SET_CLASS,
    class: carDetails.class,
  }
}

export const setNewClass = newClass => {
  return {
    type: actionTypes.SET_NEW_CLASS,
    newClass: newClass,
  }
}

export const updateClassInFirebase = newClass => {
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`

    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)

          put(`/CarsList/${data}/carDetails/class.json`, `"${newClass}"`)
            .then(res => {
              console.log(res)

              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        console.log(err)

        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const setEngine = engine => {
  return {
    type: actionTypes.SET_ENGINE,
    engine: engine,
  }
}

export const setNewEngine = newEngine => {
  return {
    type: actionTypes.SET_NEW_ENGINE,
    newEngine: newEngine,
  }
}

export const updateEngineInFirebase = newEngine => {
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`

    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)

          put(`/CarsList/${data}/carDetails/engine.json`, `"${newEngine}"`)
            .then(res => {
              console.log(res)

              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        console.log(err)
        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const setHorsePower = horsePower => {
  return {
    type: actionTypes.SET_HORSE_POWER,
    horsePower: horsePower,
  }
}

export const setNewHorsePower = newHorsePower => {
  return {
    type: actionTypes.SET_NEW_HORSE_POWER,
    newHorsePower: newHorsePower,
  }
}

export const updateHorsePowerInFirebase = newHorsePower => {
  return dispatch => {
    const queryParams = `&orderBy="CarID"&equalTo=${localStorage.getItem(
      'carID'
    )}`

    get('/CarsList.json', queryParams)
      .then(res => {
        Object.keys(res.data).map(data => {
          console.log(data)

          put(
            `/CarsList/${data}/carDetails/horsePower.json`,
            `"${newHorsePower}"`
          )
            .then(res => {
              console.log(res)

              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
              //         Successfully updated</div>,
              //     isLoading: false
              // })

              // setTimeout(() => {
              //     this.setState({ redirect: <Redirect to="/" /> })
              // }, 4000)
            })
            .catch(err => {
              // this.setState({
              //     snackbarOpen: true,
              //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
              //         Something went wrong</div>,
              //     isLoading: false
              // })
            })
        })
      })
      .catch(err => {
        console.log(err)

        // this.setState({
        //     snackbarOpen: true,
        //     snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
        //         Something went wrong</div>,
        //     isLoading: false
        // })
      })
  }
}

export const editCarInit = () => {
  return dispatch => {
    const queryParams =
      '&orderBy="CarID"&equalTo=' + localStorage.getItem('carID')

    get('/CarsList.json', queryParams).then(res => {
      Object.values(res.data).map(data => {
        storage
          .ref('carImages')
          .child(data.ImgName)
          .getDownloadURL()
          .then(url => {
            dispatch(setCarImage(url))
          })
        ///////////////////////////////////////////////
        const exteriorImagesFileName = Object.values(data.ExteriorImages).map(
          data => {
            storage
              .ref('exteriorImages')
              .child(data)
              .getDownloadURL()
              .then(url => {
                localStorage.setItem(data + 'EditCarExteriorImage', url)
              })
            return data
          }
        )
        dispatch(setExteriorImages(exteriorImagesFileName))
        ///////////////////////////////////////////////
        const interiorImagesFileName = Object.values(data.InteriorImages).map(
          data => {
            storage
              .ref('interiorImages')
              .child(data)
              .getDownloadURL()
              .then(url => {
                localStorage.setItem(data + 'EditCarInteriorImage', url)
              })
            return data
          }
        )

        dispatch(setInteriorImages(interiorImagesFileName))
        dispatch(setCarName(data.CarName))
        dispatch(setPricePerday(data.PricePerday))
        dispatch(setBodyType(data.carDetails.bodyType))
        dispatch(setClass(data.carDetails))
        dispatch(setEngine(data.carDetails.engine))
        dispatch(setHorsePower(data.carDetails.horsePower))

        // this.setState({
        //     imgName: data.ImgName,
        //     disabled: this.props.disabled,
        //     disabledEdit: this.props.disabled
        // })
      })
    })
  }
}
