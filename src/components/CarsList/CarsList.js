import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import classes from './CarsList.module.css'
import axios from '../../axios'
import { storage } from '../../FirebaseStorage/FirebaseStorage'
import { connect } from 'react-redux'

import addCarLogo from '../../assets/images/addCarLogo.png'
import Nexon from '../../assets/images/Nexon.png'
import Corvette from '../../assets/images/Corvette.jpg'
import ElectricCar from '../../assets/images/electricCar.png'
import Vauxhall from '../../assets/images/vauxhall.png'
import KIA from '../../assets/images/KIA.jpg'
import CarDetails from '../CarDetails/CarDetails'
import SnackBar from '@material-ui/core/Snackbar'
import ThickMark from '../../assets/images/thick mark.png'
import FailedMark from '../../assets/images/failedMark.jpg'

class CarsList extends Component {
  state = {
    carList: [],
    counter: 0,
    url: '',
    loading: 'Loading....',
    addNewCarModalIsOpen: false,
    carName: '',
    costPerDay: '',
    carImageName: '',
    engine: '',
    horsePower: '',
    class: '',
    bodyType: '',
    exteriorImagesFile: [],
    interiorImagesFile: [],
    exteriorImagesFileFirebase: [],
    interiorImagesFileFirebase: [],
    isLoadingButtonSpinner: false,
    snackbarOpen: false,
    snackbarMsg: '',
    alertMsgAddNewCar: '',
    display: 'none',
    carID: 0,
  }

  snackbarClose = () => {
    this.setState({ snackbarOpen: false })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleChangeImg = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      this.setState(() => ({ image }))
      // localStorage.setItem("imgName", image.name);
      // localStorage.setItem("imgName", image.name);
      console.log(image)
    }
  }

  handleAddNewCar = () => {
    this.setState({ isLoadingButtonSpinner: true })
    const { image } = { ...this.state }
    console.log(this.state.exteriorImagesFileFirebase.length, ' :exterior')
    if (this.state.carName === '') {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please fill Name field!!',
        isLoadingButtonSpinner: false,
      })
    } else if (this.state.costPerDay === '') {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please fill (Cost Perday) field!!',
        isLoadingButtonSpinner: false,
      })
    } else if (image === undefined) {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please insert an image in (Car Image) field!!',
        isLoadingButtonSpinner: false,
      })
    } else if (this.state.engine === '') {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please fill (Engine) field!!',
        isLoadingButtonSpinner: false,
      })
    } else if (this.state.horsePower === '') {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please fill (Horse Power) field!!',
        isLoadingButtonSpinner: false,
      })
    } else if (this.state.class === '') {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please fill (Class) field!!',
        isLoadingButtonSpinner: false,
      })
    } else if (this.state.bodyType === '') {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please fill (Body Type) field!!',
        isLoadingButtonSpinner: false,
      })
    } else if (this.state.exteriorImagesFileFirebase.length === 0) {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please insert atleast one Exterior Image',
        isLoadingButtonSpinner: false,
      })
    } else if (this.state.interiorImagesFileFirebase.length === 0) {
      this.setState({
        display: 'block',
        alertMsgAddNewCar: 'Please insert atleast one Interior Image',
        isLoadingButtonSpinner: false,
      })
    } else {
      storage.ref('carImages/' + image.name).put(image)
      console.log(image.name)
      const newCar = {
        CarID: parseInt(localStorage.getItem('NoOfCars')) + 1,
        CarName: this.state.carName,
        PricePerday: this.state.costPerDay,
        ImgName: image.name,
        carDetails: {
          engine: this.state.engine,
          horsePower: this.state.horsePower,
          class: this.state.class,
          bodyType: this.state.bodyType,
        },
        ExteriorImages: this.state.exteriorImagesFileFirebase,
        InteriorImages: this.state.interiorImagesFileFirebase,
        disabled: false,
      }

      axios
        .post('/CarsList.json?auth=' + this.props.token, newCar)
        .then(res => {
          this.addNewCarToggleModal()
          this.setState({
            isLoadingButtonSpinner: false,
            snackbarOpen: true,
            snackbarMsg: (
              <div>
                {' '}
                <img
                  src={ThickMark}
                  alt="Thick Mark"
                  width="20px"
                  height="20px"
                />
                Added successfully
              </div>
            ),
          })

          localStorage.setItem(
            'NoOfCars',
            parseInt(localStorage.getItem('NoOfCars')) + 1
          )
        })
        .catch(
          err => console.log(err),
          this.setState({
            isLoadingButtonSpinner: false,
            snackbarOpen: true,
            snackbarMsg: (
              <div>
                {' '}
                <img
                  src={FailedMark}
                  alt="Failed Mark"
                  width="20px"
                  height="20px"
                />
                Something went wrong
              </div>
            ),
          })
        )
    }
  }

  setCarId = carID => {
    localStorage.setItem('carID', carID)
  }

  addNewCarToggleModal = () => {
    this.setState({
      addNewCarModalIsOpen: !this.state.addNewCarModalIsOpen,
      counter: 0,
      carName: '',
      costPerDay: '',
      carImageName: '',
      engine: '',
      horsePower: '',
      class: '',
      bodyType: '',
      exteriorImagesFile: [],
      exteriorImagesFileFirebase: [],
      interiorImagesFile: [],
      interiorImagesFileFirebase: [],
    })
  }

  handleRetrieve = (
    carID,
    carName,
    pricePerday,
    exteriorImages,
    interiorImages,
    disabled,
    carDetails
  ) => {
    let url = this.state.url

    if (!disabled) {
      return (
        <NavLink
          to={{
            pathname: '/User/CarsList/CarDetails',
            aboutProps: {
              carName: carName,
              url: url,
              PricePerday: pricePerday,
              exteriorImages: exteriorImages,
              interiorImages: interiorImages,
              carDetails: carDetails,
            },
          }}
          key={carID}
        >
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
            }}
            onClick={() => this.setCarId(carID)}
          >
            <div className={' bg-white text-black'}>
              <div
                style={{ height: '180px' }}
                className={[classes.BorderGroove, 'card-body text-center'].join(
                  ' '
                )}
              >
                <img
                  src={this.state.url || 'https://via.placeholder.com/70x70'}
                  alt="Rental Car"
                  width="70px"
                  height="70px"
                />
                <p
                  className="card-text"
                  style={{ opacity: 0.5, textTransform: 'capitalize' }}
                >
                  {carName}
                </p>
                <hr />
                <p>{pricePerday}$/DAY</p>
              </div>
            </div>
          </button>
        </NavLink>
      )
    } else {
      return (
        <button
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
          }}
          key={carID}
          disabled
        >
          <div className={' bg-white text-black'}>
            <div
              style={{ height: '180px', position: 'relative' }}
              className={[classes.BorderGroove, 'card-body text-center'].join(
                ' '
              )}
            >
              <img
                src={this.state.url}
                alt="Rental Car"
                width="70px"
                height="70px"
              />
              <p
                className="card-text"
                style={{ opacity: 0.5, textTransform: 'capitalize' }}
              >
                {carName}
              </p>
              <hr />
              <p>{pricePerday}$/DAY</p>
              <span
                style={{
                  backgroundColor: 'rgba(255,0,0,0.8)',
                  top: '75px',
                  left: '-25px',
                  color: 'white',
                  position: 'absolute',
                  float: 'right',
                  transform: 'rotate(49deg)',
                  width: '200px',
                  borderRadius: '1px',
                }}
              >
                RENTED
              </span>
            </div>
          </div>
        </button>
      )
    }
  }

  addNewExteriorImageFile = () => {
    this.setState({
      exteriorImagesFile: [...this.state.exteriorImagesFile, ''],
    })
  }

  handleChangeExteriorImageFile = (e, index) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      storage.ref('exteriorImages/' + image.name).put(image)
      this.state.exteriorImagesFileFirebase[index] = image.name
      console.log(image.name)
    }

    this.state.exteriorImagesFile[index] = e.target.value
    this.setState({ exteriorImagesFile: this.state.exteriorImagesFile })
  }

  handleRemoveExteriorImageFile = index => {
    const image = this.state.exteriorImagesFile.splice(index, 1)

    console.log(this.state.exteriorImagesFile, 'exterior$$$')
    console.log(image, '$$$')
    //Update the state
    this.setState({ exteriorImagesFile: this.state.exteriorImagesFile })
  }
  /////////////////
  addNewInteriorImageFile = () => {
    this.setState({
      interiorImagesFile: [...this.state.interiorImagesFile, ''],
    })
  }

  handleChangeInteriorImageFile = (e, index) => {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      storage.ref('interiorImages/' + image.name).put(image)
      this.state.interiorImagesFileFirebase[index] = image.name
      console.log(image.name)
    }

    this.state.interiorImagesFile[index] = e.target.value
    this.setState({ interiorImagesFile: this.state.interiorImagesFile })
  }

  handleRemoveInteriorImageFile = index => {
    const image = this.state.interiorImagesFile.splice(index, 1)

    console.log(this.state.interiorImagesFile, 'interior$$$')
    console.log(image, '$$$')
    //Update the state
    this.setState({ interiorImagesFile: this.state.interiorImagesFile })
  }

  componentDidMount = () => {
    localStorage.setItem('isAdmin', this.props.admin === 'admin')
    localStorage.setItem('refreshCarDetailsPage', 'false')
    axios
      .get('/CarsList.json?auth=' + this.props.token)
      .then(response => {
        let counter = 0
        Object.values(response.data).map((data, i) => {
          counter++

          let carList = ''

          storage
            .ref('carImages/')
            .child(data.ImgName)
            .getDownloadURL()
            .then(url => {
              this.setState({ url: url })
              carList = this.handleRetrieve(
                data.CarID,
                data.CarName,
                data.PricePerday,
                data.ExteriorImages,
                data.InteriorImages,
                data.disabled,
                data.carDetails
              )

              this.setState(state => {
                state.carList.push(carList)
              })
            })

          return carList
        })
        console.log(counter, ':counter')
        localStorage.setItem('NoOfCars', counter)
        this.setState({
          loading: '',
        })
        console.log('spinner')
      })
      .catch(error => {
        // this.setState({error: true});
      })
  }

  render() {
    let carsList = [...this.state.carList]

    let style = null

    if (this.props.admin !== 'admin') {
      style = '30px 122px 70px 30px'
    }

    return (
      <div>
        <SnackBar
          className={classes.SnackBar}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
        />

        <Modal
          isOpen={this.state.addNewCarModalIsOpen}
          className="modal-dialog-centered"
          toggle={this.addNewCarToggleModal}
        >
          <ModalHeader
            toggle={this.addCarToggleModal}
            style={{ borderBottom: '0.5px solid rgba(169, 169, 169, .5)' }}
            cssModule={{ 'modal-title': 'w-100 text-center' }}
          >
            <p
              className="modal-title"
              style={{ fontSize: '30px', textDecoration: 'underline' }}
            >
              Add New Car
            </p>
          </ModalHeader>

          <ModalBody
            className="container"
            style={{ overflowY: 'scroll', height: '200px' }}
          >
            <label style={{ display: 'block' }}>Name:</label>

            <input
              type="text"
              id="carName"
              onChange={this.handleChange}
              style={{
                border: '2px solid gray',
                borderRadius: '10px',
                padding: '3px',
                marginTop: '-7px',
                outline: 'none',
              }}
              required
            />

            <label style={{ display: 'block', marginTop: '10px' }}>
              Cost Per Day:
            </label>
            <input
              type="text"
              id="costPerDay"
              onChange={this.handleChange}
              style={{
                border: '2px solid gray',
                borderRadius: '10px',
                padding: '3px',
                marginTop: '-7px',
                outline: 'none',
              }}
              required
            />

            <label style={{ display: 'block', marginTop: '10px' }}>
              Car Image:
            </label>
            <input
              type="file"
              id="carImageName"
              onChange={this.handleChangeImg}
              style={{ marginTop: '-1px', display: 'block' }}
              required
            />

            <label style={{ display: 'block', marginTop: '20px' }}>
              Engine:
            </label>
            <input
              type="text"
              id="engine"
              onChange={this.handleChange}
              style={{
                border: '2px solid gray',
                borderRadius: '10px',
                padding: '3px',
                marginTop: '-7px',
                outline: 'none',
              }}
              required
            />

            <label style={{ display: 'block', marginTop: '20px' }}>
              Horse Power:
            </label>
            <input
              type="text"
              id="horsePower"
              onChange={this.handleChange}
              style={{
                border: '2px solid gray',
                borderRadius: '10px',
                padding: '3px',
                marginTop: '-7px',
                outline: 'none',
              }}
              required
            />

            <label style={{ display: 'block', marginTop: '20px' }}>
              Class:
            </label>
            <input
              type="text"
              id="class"
              onChange={this.handleChange}
              style={{
                border: '2px solid gray',
                borderRadius: '10px',
                padding: '3px',
                marginTop: '-7px',
                outline: 'none',
              }}
              required
            />

            <label style={{ display: 'block', marginTop: '20px' }}>
              Body Type:
            </label>
            <input
              type="text"
              id="bodyType"
              onChange={this.handleChange}
              style={{
                border: '2px solid gray',
                borderRadius: '10px',
                padding: '3px',
                marginTop: '-7px',
                outline: 'none',
                display: 'block',
              }}
              required
            />

            <hr style={{ backgroundColor: 'gray', width: '60%' }} />

            {this.state.exteriorImagesFile.map((exteriorImagesFile, index) => {
              console.log(exteriorImagesFile)
              return (
                <div key={index}>
                  <input
                    type="file"
                    style={{ marginTop: '5px' }}
                    onChange={e => this.handleChangeExteriorImageFile(e, index)}
                    value={exteriorImagesFile}
                  />

                  <button
                    onClick={() => this.handleRemoveExteriorImageFile(index)}
                  >
                    Remove
                  </button>
                </div>
              )
            })}

            <button
              onClick={e => this.addNewExteriorImageFile(e)}
              className="btn btn-outline-dark"
              style={{ marginTop: '5px' }}
            >
              AddNewExteriorImageFile
            </button>

            <hr style={{ backgroundColor: 'gray', width: '60%' }} />

            {/* /////////////////////////////////////// */}
            {this.state.interiorImagesFile.map((interiorImagesFile, index) => {
              console.log(interiorImagesFile)
              return (
                <div key={index}>
                  <input
                    type="file"
                    style={{ marginTop: '5px' }}
                    onChange={e => this.handleChangeInteriorImageFile(e, index)}
                    value={interiorImagesFile}
                  />

                  <button
                    onClick={() => this.handleRemoveInteriorImageFile(index)}
                  >
                    Remove
                  </button>
                </div>
              )
            })}

            <button
              onClick={e => this.addNewInteriorImageFile(e)}
              className="btn btn-outline-dark"
              style={{ marginTop: '5px' }}
            >
              AddNewInteriorImageFile
            </button>

            <hr style={{ backgroundColor: 'gray', width: '60%' }} />
          </ModalBody>

          <ModalFooter>
            <div
              className="alert alert-warning"
              style={{ display: this.state.display, margin: 'auto' }}
            >
              <strong>Err!</strong> {this.state.alertMsgAddNewCar}
            </div>

            <button
              className="btn btn-outline-primary"
              onClick={this.addNewCarToggleModal}
            >
              Cancel
            </button>

            <div>
              <Button
                color="primary"
                onClick={this.handleAddNewCar}
                disabled={this.state.isLoadingButtonSpinner}
              >
                {this.state.isLoadingButtonSpinner && (
                  <i className="spinner-grow spinner-grow-sm" role="status"></i>
                )}
                {this.state.isLoadingButtonSpinner && <span> Loading...</span>}
                {!this.state.isLoadingButtonSpinner && <span> Confirm</span>}
              </Button>
            </div>
          </ModalFooter>
        </Modal>

        {this.props.admin === 'admin' ? (
          <input
            type="image"
            title="Add new car"
            className={classes.inputImage}
            onClick={this.addNewCarToggleModal}
            src={addCarLogo}
            alt="Add New Car"
          />
        ) : null}

        <Route path="/User/CarsList/CarDetails" exact component={CarDetails} />

        <div style={{ margin: style }} className={classes.divMargin}>
          <h4
            style={{
              textDecoration: 'underline',
              fontSize: '15px',
              marginLeft: '21px',
              clear: 'both',
            }}
          >
            Cars List{' '}
          </h4>

          <div className={[classes.CarsList, 'card-rows'].join(' ')}>
            {this.state.loading}

            {carsList}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
  }
}

export default connect(mapStateToProps)(CarsList)
