import React from 'react';
import RenatlCar from '../../assets/images/RentACarLogo2.png';
import classes from './Logo.module.css';

const logo = (props) => (

    <div className={classes.Logo}>
   <img  src={RenatlCar} alt="Rental Car"/>
    </div>
);

export default logo;