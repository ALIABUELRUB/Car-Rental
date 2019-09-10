import React, { Component } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import { Modal, ModalHeader, ModalBody, ButtonToolbar } from 'reactstrap';
import { storage } from '../../FirebaseStorage/FirebaseStorage';
import { connect } from 'react-redux';

import InteriorImages from './InteriorImages/InteriorImages';
import ExteriorImages from './ExteriorImages/ExteriorImages';
import Aux from '../../hoc/Auxx/Auxx';
import Rent from './Rent/Rent';
import DeleteCar from './DeleteCar/DeleteCar';
import EditCar from './EditCar/EditCar';
import * as carDetailsActions from '../../store/actions/index';

class CarDetails extends Component {

    state = {
        modalIsOpen: false,
        rent: false,
        interiorImages: false,
        exteriorImages: true
    };

    componentWillMount = () => {
        if (localStorage.getItem("refreshCarDetailsPage") !== "true" && this.props.location.aboutProps !== null) {
            localStorage.setItem("class", this.props.location.aboutProps.car.carDetails.class)
            localStorage.setItem("engine", this.props.location.aboutProps.car.carDetails.engine)
            localStorage.setItem("horsePower", this.props.location.aboutProps.car.carDetails.horsePower)
            localStorage.setItem("bodyType", this.props.location.aboutProps.car.carDetails.bodyType)
            localStorage.setItem("refreshCarDetailsPage", "true")
            localStorage.setItem("disabled", this.props.location.aboutProps.car.disabled)
        }
    }

    componentDidMount = () => {

        if (this.props.location.aboutProps != null) {
            localStorage.setItem("aboutProps", JSON.stringify(this.props.location.aboutProps))
        }


        let retrievedObject = localStorage.getItem('aboutProps');
        let carDescriptionDidMount = { ...JSON.parse(retrievedObject) };

        this.props.onExteriorImages(carDescriptionDidMount.car.ExteriorImages);
        this.props.onInteriorImages(carDescriptionDidMount.car.InteriorImages);
    }

    toggleModalImages = (text) => {

        if (text === "interior") {
            this.setState({
                interiorImages: true,
                exteriorImages: false
            })
        }

        if (text === "exterior") {
            this.setState({
                interiorImages: false,
                exteriorImages: true
            })
        }

        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    interiorImagesIsClicked = () => {
        this.setState({
            interiorImages: true,
            exteriorImages: false
        })
    }

    exteriorImagesIsClicked = () => {
        this.setState({
            exteriorImages: true,
            interiorImages: false
        })
    }

    rent = () => {
        this.setState({
            rent: true,
            exteriorImages: false,
            interiorImages: false
        })
    }



    render() {

        if (this.props.location.aboutProps != null) {
            localStorage.setItem("carDescription", JSON.stringify(this.props.location.aboutProps))
        }
        let retrievedObject = JSON.parse(localStorage.getItem('carDescription'));
        console.log('retrievedObject: ', retrievedObject);
        localStorage.setItem("imgURL", retrievedObject.car.imgURL);

        let show = "";
        let x = 1;//ToggleButtonGroup

        if (this.state.interiorImages) {
            show = <InteriorImages interiorImages={this.props.interiorImagesURL} />
            x = 2;
        } else if (this.state.exteriorImages) {
            show = <ExteriorImages exteriorImages={this.props.exteriorImagesURL} />
            x = 1;
        } else if (this.state.rent) {
            show = <Rent />
        }

        console.log(this.props.exteriorImagesURL)
        return (

            (
                <Aux >


                    <div className="container mt-2" >
                        {localStorage.getItem("isAdmin") !== "false" ? <DeleteCar /> : null}

                        {localStorage.getItem("isAdmin") !== "false" ? <EditCar disabled={localStorage.getItem("disabled")} /> : null}

                        {localStorage.getItem("isAdmin") === "false" ? <Rent
                            carID={localStorage.getItem("carID")}
                            carName={retrievedObject.car.CarName}
                            pricePerday={retrievedObject.car.PricePerday} /> : null}
                        <p style={{
                            textDecoration: "underline", textTransform: 'capitalize',
                            textDecorationStyle: "dotted"
                        }}>
                            {retrievedObject.car.CarName}
                        </p>


                        <Carousel showArrows={false}
                            showThumbs={false} showStatus={false} dynamicHeight
                            showIndicators={false}
                            stopOnHover={true} transitionTime={2000} interval={7000}
                            className="col-lg-4 col-md-5 col-sm-7  m-auto"
                        >

                            <button onClick={() => this.toggleModalImages("exterior")} style={{
                                border: "none",
                                backgroundColor: "white", outline: "none"
                            }}>

                                <img src={localStorage.getItem("imgURL")} alt="CarImg" height="200px"
                                    style={{ backgroundColor: "white" }} />

                            </button>

                        </Carousel>

                        <div className="col text-center" >

                            <button onClick={() =>
                                this.toggleModalImages("exterior")}
                                style={{
                                    border: "none", backgroundColor: "white",
                                    outline: "none"
                                }} >

                                <span className="fas fa-search-plus"></span>
                                Exterior Images
                                </button>

                            <button onClick={() =>
                                this.toggleModalImages("interior")}
                                style={{
                                    outline: "none", border: "none",
                                    backgroundColor: "white"
                                }} className="ml-2">
                                <span className="fas fa-search-plus"></span>
                                Interior Images
                                </button>
                        </div>

                        <Modal isOpen={this.state.modalIsOpen} className="modal-dialog-centered"
                            toggle={this.toggleModalImages}>
                            <ModalHeader toggle={this.toggleModalImages} style={{ borderBottom: "0.5px solid rgba(169, 169, 169, .5)" }}>

                                <ButtonToolbar>
                                    <ToggleButtonGroup type="radio" name="options" defaultValue={x}>
                                        <ToggleButton className="rounded" style={{ color: "white" }}
                                            variant="dark" value={1} onClick={this.exteriorImagesIsClicked}>
                                            Exterior
                                        </ToggleButton>

                                        <ToggleButton className="ml-2 rounded" style={{ color: "white" }}
                                            variant="dark" value={2} onClick={this.interiorImagesIsClicked}>
                                            Interior
                                        </ToggleButton>

                                    </ToggleButtonGroup>
                                </ButtonToolbar>


                            </ModalHeader>

                            <ModalBody>

                                {show}

                            </ModalBody>


                        </Modal>

                        <hr style={{ backgroundColor: "black", opacity: ".5", width: "81%" }} />
                        <h3 style={{ textDecoration: "underline", marginTop: "7px" }}>Details:</h3>

                        <ul>
                            <li style={{ listStyle: "none" }}><p style={{ opacity: "0.7", display: "inline" }}> Engine: </p><span><strong className="text-capitalize"> {localStorage.getItem("engine")}</strong></span></li>

                            <li style={{ listStyle: "none" }}><p style={{ opacity: "0.7", display: "inline" }}> Horse Power: </p><span><strong className="text-capitalize">{localStorage.getItem("horsePower")}</strong></span></li>

                            <li style={{ listStyle: "none" }}><p style={{ opacity: "0.7", display: "inline" }}> Class: </p><span><strong className="text-capitalize">{localStorage.getItem("class")}</strong></span></li>

                            <li style={{ listStyle: "none" }}><p style={{ opacity: "0.7", display: "inline" }}> Body Type: </p><span><strong className="text-capitalize">{localStorage.getItem("bodyType")}</strong></span></li>

                        </ul>

                    </div>
                </Aux>
            )
        );
    }
}

const mapStateToProps = state => {
    return {
        exteriorImagesURL: state.carDetails.exteriorImagesURL,
        interiorImagesURL: state.carDetails.interiorImagesURL
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onExteriorImages: (exteriorImages) => dispatch(carDetailsActions.exteriorImages(exteriorImages)),
        onInteriorImages: (interiorImages) => dispatch(carDetailsActions.interiorImages(interiorImages))
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(CarDetails);