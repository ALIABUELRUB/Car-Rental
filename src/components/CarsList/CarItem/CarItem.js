import React from 'react';
import { NavLink, Route } from 'react-router-dom';

import classes from './CarItem.module.css';

const carItem = (props) => {

    const setCarId = (carID) => {
        localStorage.setItem("carID", carID)
    }
    
    if (!props.car.disabled) {
        return (<NavLink to={{
            pathname: "/User/CarsList/CarDetails",
            aboutProps: {
                car: props.car
            }
        }} >
            <button style={{ backgroundColor: "transparent", border: "none", outline: "none" }}
                onClick={() => setCarId(props.car.CarID)}>
                <div className={" bg-white text-black"}>
                    <div
                        style={{ height: "180px" }}
                        className={[classes.BorderGroove, "card-body text-center"].join(" ")}>

                        <img src={props.car.imgURL || "https://via.placeholder.com/70x70"}
                            alt="Rental Car" width="70px" height="70px" />
                        <p className="card-text" style={{ opacity: 0.5, textTransform: 'capitalize' }}>{props.car.CarName}</p>
                        <hr />
                        <p>{props.car.PricePerday}$/DAY</p>
                    </div>
                </div>
            </button>
        </NavLink>);
    } else {
        return (
            <button style={{ backgroundColor: "transparent", border: "none", outline: "none" }} disabled>
                <div className={" bg-white text-black"}>
                    <div
                        style={{ height: "180px", position: "relative" }}
                        className={[classes.BorderGroove, "card-body text-center"].join(" ")}>

                        <img src={props.car.imgURL || "https://via.placeholder.com/70x70"}
                            alt="Rental Car" width="70px" height="70px" />
                        <p className="card-text" style={{ opacity: 0.5, textTransform: 'capitalize' }}>{props.car.CarName}</p>
                        <hr />
                        <p>{props.car.PricePerday}$/DAY</p>
                        <span
                            style={{
                                backgroundColor: "rgba(255,0,0,0.8)", top: "75px", left: "-25px", color: "white", position: "absolute",
                                float: "right", transform: "rotate(49deg)", width: "200px", borderRadius: "1px"
                            }}>
                            RENTED</span>
                    </div>
                </div>
            </button>
        );
    }
}

export default carItem;