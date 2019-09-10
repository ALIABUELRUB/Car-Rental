import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as carListActions from '../../store/actions/index'
import classes from './CarsList.module.css'
import addCarLogo from '../../assets/images/addCarLogo.png'
import CarItem from './CarItem/CarItem'

class CarsListContainer extends Component {
  componentDidMount = () => {
    localStorage.setItem('refreshCarDetailsPage', 'false')
    localStorage.setItem(
      'isAdmin',
      localStorage.getItem('email') === 'admin@admin.com'
    )
    this.props.onInitCars()
  }

  setCarId = carID => {
    localStorage.setItem('carID', carID)
  }

  render() {
    let style = null

    if (localStorage.getItem('email') !== 'admin@admin.com') {
      style = '30px 122px 70px 30px'
    }

    let carItem = 'Loading...'

    if (!this.props.loading) {
      carItem = this.props.cars.map(car => {
        return <CarItem car={car} key={car.CarID} />
      })
    }

    return (
      <div>
        {localStorage.getItem('email') === 'admin@admin.com' ? (
          <input
            type="image"
            title="Add new car"
            className={classes.inputImage}
            onClick={this.addNewCarToggleModal}
            src={addCarLogo}
            alt="Add New Car"
          />
        ) : null}

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
            {carItem}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cars: state.carsList.carsList,
    loading: state.carsList.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitCars: () => dispatch(carListActions.fetchCars()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarsListContainer)
