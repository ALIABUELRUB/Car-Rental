import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { storage } from '../../../FirebaseStorage/FirebaseStorage';
import { Redirect } from 'react-router-dom';

import SnackBar from '@material-ui/core/Snackbar';
import axios from '../../../axios';
import classes from './EditCar.module.css';
import ThickMark from '../../../assets/images/thick mark.png';
import FailedMark from '../../../assets/images/failedMark.jpg';
import * as editCarActions from '../../../store/actions/index';

class EditCar extends Component {

    state = {
        editCarModalIsOpen: false,
        imgName: '',
        cancelEditingModalIsOpen: false,
        isLoading: false,
        nothingToEdit: "",
        url: '',
        redirect: '',
        snackbarOpen: false,
        snackbarMsg: '',
        exteriorImages: [],
        exteriorImagesArray: [],
        exteriorImagesArrayLength: [],
        exteriorImagesFile: [],
        exteriorImagesFileFirebase: [],
        interiorImages: [],
        interiorImagesArray: [],
        interiorImagesArrayLength: [],
        interioImageURLEdit: '',
        interiorImagesFile: [],
        interiorImagesFileFirebase: [],
        disabled: '',
        disabledEdit: ''
    }

    componentDidMount = () => {
        this.props.onEditCar()
    }

    editCarToggleModal = () => {
        this.setState({
            carNameEdit: this.state.carName,
            pricePerdayEdit: this.state.pricePerday,
            bodyTypeEdit: this.state.bodyType,
            classEdit: this.state.class,
            engineEdit: this.state.engine,
            horsePowerEdit: this.state.horsePower,
            editCarModalIsOpen: !this.state.editCarModalIsOpen,
            isLoading: false,
            redirect: '',
            exteriorImages: [],
            exteriorImagesArray: [],
            exteriorImagesArrayLength: [],
            exteriorImagesFileFirebase: [],
            interiorImages: [],
            interiorImagesArray: [],
            interiorImagesArrayLength: [],
            interiorImagesFileFirebase: [],
            exteriorImagesFile: [],
            disabled: '',
            disabledEdit: '',
            interiorImagesFile: [],
            nothingToEdit: "",
            image: undefined
        })
        this.componentDidMount()
    }

    snackbarClose = (event) => {
        this.setState({ snackbarOpen: false });
    }

    handleChange = (e) => {


        if ([e.target.id] == "pricePerdayEdit") {

            console.log([e.target.id])
            this.setState({

                [e.target.id]: parseInt(e.target.value),
                nothingToEdit: ""
            })
        } else {
            this.setState({
                [e.target.id]: e.target.value,
                nothingToEdit: ""
            })
        }
    }

    editHandler = () => {
        const queryParams = '?auth=' + this.props.token + '&orderBy="CarID"&equalTo=' + localStorage.getItem("carID");

        const { image } = { ...this.state };
        this.setState({ nothingToEdit: "" })
        if (image !== undefined) {
            storage.ref('carImages/' + image.name).put(image)
        }
        console.log(this.props.carNameEdit, " this.props.carNameEdit ")
        console.log(this.props.carName, " this.props.carName")
        if (this.props.carNameEdit !== this.props.carName || this.state.pricePerdayEdit !== this.state.pricePerday
            || this.state.bodyTypeEdit !== this.state.bodyType || this.state.classEdit !== this.state.class
            || this.props.engineEdit !== this.props.engine || this.props.horsePowerEdit !== this.props.horsePower
            || image !== undefined || this.state.interiorImagesArrayLength !== this.state.interiorImagesArray.length
            || this.props.exteriorImagesFileNameLength !== this.props.exteriorImagesFileName.length
            || this.state.exteriorImagesFile.length > 0 || this.state.interiorImagesFile.length > 0) {

            this.setState({ isLoading: true })

            if (this.props.carNameEdit !== this.props.carName) {
                this.props.onSetNewCarName(this.props.carNameEdit)
                this.props.onUpdateCarName(this.props.carNameEdit)
            }

            if (this.props.pricePerdayEdit !== this.props.pricePerday) {
                this.props.onSetNewPricePerday(this.props.pricePerdayEdit)
                this.props.onUpdatePricePerday(this.props.pricePerdayEdit)
                // this.setState({
                //     isLoading: true,
                //     pricePerday: this.state.pricePerdayEdit
                // })

            }

            if (this.props.bodyTypeEdit !== this.props.bodyType) {
                this.props.onSetNewBodyType(this.props.bodyTypeEdit)
                this.props.onUpdateBodyType(this.props.bodyTypeEdit)

                this.setState({
                    isLoading: true,
                    bodyType: this.state.bodyTypeEdit
                })


            }

            if (this.props.classEdit !== this.props.class) {
                this.props.onSetNewClass(this.props.classEdit)
                this.props.onUpdateClass(this.props.classEdit)

                this.setState({
                    isLoading: true,
                    class: this.state.classEdit
                })


            }

            if (this.props.engineEdit !== this.props.engine) {

                this.props.onSetNewEngine(this.props.engineEdit)
                this.props.onUpdateEngine(this.props.engineEdit)

                this.setState({
                    isLoading: true,
                    engine: this.state.engineEdit
                })


            }

            if (this.props.horsePowerEdit !== this.props.horsePower) {
                this.props.onSetNewHorsePower(this.props.horsePowerEdit)
                this.props.onUpdateHorsePower(this.props.horsePowerEdit)
                this.setState({
                    isLoading: true,
                    horsePower: this.state.horsePowerEdit
                })

            }

            if (image !== undefined) {

                if (image.name !== this.state.imgName) {

                    this.setState({
                        isLoading: true,
                        imgName: image.name
                    })

                    axios.get('/CarsList.json' + queryParams)
                        .then(res => {

                            Object.keys(res.data).map(data => {
                                console.log(data)

                                axios.put('/CarsList/' + data + '/ImgName.json?auth=' + this.props.token, '"' + image.name + '"')
                                    .then(res => {
                                        console.log(res)

                                        storage.ref('carImages').child(image.name).getDownloadURL().then(url => {
                                            console.log(url);
                                            this.setState({ url: url });
                                        })

                                        this.setState({
                                            snackbarOpen: true,
                                            snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
                                                Successfully updated</div>,
                                            isLoading: false
                                        })

                                        setTimeout(() => {
                                            this.setState({ redirect: <Redirect to="/" /> })
                                        }, 4000)
                                    }).catch(err => {
                                        this.setState({
                                            snackbarOpen: true,
                                            snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
                                                Something went wrong</div>,
                                            isLoading: false
                                        })
                                    })
                            })
                        }).catch(err => {
                            console.log(err)

                            this.setState({
                                snackbarOpen: true,
                                snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
                                    Something went wrong</div>,
                                isLoading: false
                            })
                        })

                }


            }

            if (this.props.interiorImagesFileNameLength !== this.props.interiorImagesFileName.length) {

                this.props.onSetNewInteriorImagesFileNameLength(this.props.interiorImagesFileName.length)

                this.setState({
                    isLoading: true,
                    interiorImagesArrayLength: this.state.interiorImagesArray.length
                })

                this.props.onUpdateInteriorImagesArray(this.props.interiorImagesFileName)
            }

            if (this.props.exteriorImagesFileNameLength !== this.props.exteriorImagesFileName.length) {


                this.props.onSetNewExteriorImagesFileNameLength(this.props.exteriorImagesFileName.length)

                // this.setState({
                //     isLoading: true,
                //     exteriorImagesArrayLength: this.state.exteriorImagesArray.length
                // })
                this.props.onUpdateExteriorImagesArray(this.props.exteriorImagesFileName)
            }

            console.log(this.state.exteriorImagesFileFirebase.length, " this.state.exteriorImagesFileFirebase.length")
            if (this.state.exteriorImagesFile.length > 0) {

                let i = 0;
                for (i = 0; i < this.state.exteriorImagesFile.length; i++) {
                    if (this.state.exteriorImagesFile[i] !== "") {
                        break;
                    }
                }
                if (i < this.state.exteriorImagesFile.length) {
                    if (this.state.exteriorImagesFileFirebase.length !== 0) {

                        for (let i = 0; i < this.state.exteriorImagesFileFirebase.length; i++) {
                            if (this.state.exteriorImagesFileFirebase[i] !== "") {
                                this.state.exteriorImages.push(this.state.exteriorImagesFileFirebase[i])
                            }
                        }



                        console.log(this.state.exteriorImages);

                        this.setState({
                            isLoading: true
                        })

                        axios.get('/CarsList.json' + queryParams)
                            .then(res => {

                                Object.keys(res.data).map(data => {
                                    console.log(data)

                                    axios.put('/CarsList/' + data + '/ExteriorImages.json?auth=' + this.props.token, this.state.exteriorImages)
                                        .then(res => {
                                            console.log(res)


                                            this.setState({
                                                snackbarOpen: true,
                                                snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
                                                    Successfully updated</div>,
                                                isLoading: false
                                            })

                                            setTimeout(() => {
                                                this.setState({ redirect: <Redirect to="/" /> })
                                            }, 4000)
                                        }).catch(err => {
                                            this.setState({
                                                snackbarOpen: true,
                                                snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
                                                    Something went wrong</div>,
                                                isLoading: false
                                            })
                                        })
                                })
                            }).catch(err => {
                                console.log(err)

                                this.setState({
                                    snackbarOpen: true,
                                    snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
                                        Something went wrong</div>,
                                    isLoading: false
                                })
                            })

                    }
                } else {
                    this.setState({ nothingToEdit: "Nothing to edit" })
                }
            }

            if (this.state.interiorImagesFile.length > 0) {

                let i = 0;
                for (i = 0; i < this.state.interiorImagesFile.length; i++) {
                    if (this.state.interiorImagesFile[i] !== "") {
                        break;
                    }
                }

                if (i < this.state.interiorImagesFile.length) {
                    if (this.state.interiorImagesFileFirebase.length !== 0) {

                        for (let i = 0; i < this.state.interiorImagesFileFirebase.length; i++) {
                            if (this.state.interiorImagesFileFirebase[i] !== "") {
                                this.state.interiorImages.push(this.state.interiorImagesFileFirebase[i])
                            }
                        }



                        console.log(this.state.interiorImages);

                        this.setState({
                            isLoading: true
                        })

                        axios.get('/CarsList.json' + queryParams)
                            .then(res => {

                                Object.keys(res.data).map(data => {
                                    console.log(data)

                                    axios.put('/CarsList/' + data + '/InteriorImages.json?auth=' + this.props.token, this.state.interiorImages)
                                        .then(res => {
                                            console.log(res)


                                            this.setState({
                                                snackbarOpen: true,
                                                snackbarMsg: <div>  <img src={ThickMark} alt="Thick Mark" width="20px" height="20px" />
                                                    Successfully updated</div>,
                                                isLoading: false
                                            })

                                            setTimeout(() => {
                                                this.setState({ redirect: <Redirect to="/" /> })
                                            }, 4000)
                                        }).catch(err => {
                                            this.setState({
                                                snackbarOpen: true,
                                                snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
                                                    Something went wrong</div>,
                                                isLoading: false
                                            })
                                        })
                                })
                            }).catch(err => {
                                console.log(err)

                                this.setState({
                                    snackbarOpen: true,
                                    snackbarMsg: <div>  <img src={FailedMark} alt="Failed Mark" width="20px" height="20px" />
                                        Something went wrong</div>,
                                    isLoading: false
                                })
                            })

                    }
                } else {
                    this.setState({
                        isLoading: false,
                        nothingToEdit: "Nothing to edit"
                    })
                }
            }

        } else {
            this.setState({ nothingToEdit: "Nothing to edit" })
        }

    }



    cancelEditButton = () => {

        const { image } = { ...this.state };

        if (this.props.carNameEdit !== this.props.carName) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.props.pricePerdayEdit !== this.props.pricePerday) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.props.bodyTypeEdit !== this.props.bodyType) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.props.classEdit !== this.props.class) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.props.engineEdit !== this.props.engine) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.props.horsePowerEdit !== this.props.horsePower) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (image !== undefined) {

            if (image.name !== this.state.imgName) {
                this.setState({ cancelEditingModalIsOpen: true })
            } else {
                this.editCarToggleModal()
            }

        } else if (this.props.exteriorImagesFileNameLength !== this.props.exteriorImagesFileName.length) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.props.interiorImagesFileNameLength !== this.props.interiorImagesFileName.length) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.state.disabledEdit !== this.state.disabled) {
            this.setState({ cancelEditingModalIsOpen: true })
        } else if (this.state.exteriorImagesFile.length > 0) {
            let i = 0;
            for (i = 0; i < this.state.exteriorImagesFile.length; i++) {
                if (this.state.exteriorImagesFile[i] !== "") {
                    this.setState({ cancelEditingModalIsOpen: true })
                    break;
                }
            }
            if (i >= this.state.exteriorImagesFile.length) {
                this.editCarToggleModal()
            }

        } else if (this.state.interiorImagesFile.length > 0) {
            let i = 0;
            for (i = 0; i < this.state.interiorImagesFile.length; i++) {
                if (this.state.interiorImagesFile[i] !== "") {
                    this.setState({ cancelEditingModalIsOpen: true })
                    break;
                }
            }
            if (i >= this.state.interiorImagesFile.length) {
                this.editCarToggleModal()
            }

        }
        else {
            this.editCarToggleModal()
        }

    }

    continueWithoutSavingToggleModal = () => {
        this.setState({
            cancelEditingModalIsOpen: !this.state.cancelEditingModalIsOpen
        })
        this.editCarToggleModal()
    }

    dontContinueWithoutSavingToggleModal = () => {
        this.setState({
            cancelEditingModalIsOpen: !this.state.cancelEditingModalIsOpen
        })
    }


    handleChangeImg = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
            console.log(image);
            this.setState({ nothingToEdit: "" })
        }
    }
    /////////////////////////////////////////////////////////
    handleRemoveExteriorImage = (index) => {
        console.log(index, this.props.exteriorImagesFileName[index])

        const newExteriorImages = this.props.exteriorImagesFileName.filter((img, imgIndex) => {
            return (imgIndex !== index)
        })
        this.props.onEditExteriorImagesFileName(newExteriorImages)
        // this.setState({
        //     exteriorImages: exteriorImages,
        //     exteriorImagesArray: copyFromExteriorImages,
        //     nothingToEdit: ""
        // })

        console.log(this.state.exteriorImagesArray.length, " :exteriorImagesArray")

        // this.updateExteriorImagesArray()

    }

    handleChangeExteriorImageFile = (e, index) => {

        if (e.target.files[0]) {
            const image = e.target.files[0];
            storage.ref('exteriorImages/' + image.name).put(image)
            this.state.exteriorImagesFileFirebase[index] = image.name
            console.log(image.name);
        }


        this.state.exteriorImagesFile[index] = e.target.value
        this.setState({
            nothingToEdit: "",
            exteriorImagesFile: this.state.exteriorImagesFile
        })

    }

    handleRemoveExteriorImageFile = (index) => {


        const image = this.state.exteriorImagesFile.splice(index, 1)

        console.log(this.state.exteriorImagesFile.length)
        //Update the state
        this.setState({
            exteriorImagesFile: this.state.exteriorImagesFile
        })

    }

    addNewExteriorImageFile = () => {
        this.setState({ exteriorImagesFile: [...this.state.exteriorImagesFile, ""] })
    }
    //////////////////////////////////////////////////////////////////////
    handleRemoveInteriorImage = (index) => {
        console.log(index, this.props.interiorImagesFileName[index])

        const newInteriorImages = this.props.interiorImagesFileName.filter((img, imgIndex) => {
            return (imgIndex !== index)
        })
        this.props.onEditInteriorImagesFileName(newInteriorImages)

        // this.setState({
        //     nothingToEdit: "",
        //     interiorImages: newInteriorImages,
        //     interiorImagesArray: copyFromInteriorImages
        // })
    }

    addNewInteriorImageFile = () => {
        this.setState({ interiorImagesFile: [...this.state.interiorImagesFile, ""] })
    }

    handleChangeInteriorImageFile = (e, index) => {

        if (e.target.files[0]) {
            const image = e.target.files[0];
            storage.ref('interiorImages/' + image.name).put(image)
            this.state.interiorImagesFileFirebase[index] = image.name
            console.log(image.name);
            this.setState({ nothingToEdit: "" })
        }

        this.state.interiorImagesFile[index] = e.target.value
        this.setState({ interiorImagesFile: this.state.interiorImagesFile })
    }

    handleRemoveInteriorImageFile = (index) => {


        const image = this.state.interiorImagesFile.splice(index, 1)

        console.log(this.state.interiorImagesFile, 'interior$$$');
        console.log(image, '$$$')
        //Update the state
        this.setState({ interiorImagesFile: this.state.interiorImagesFile })

    }

    setImageInteriorURLEdit = (url, index) => {
        localStorage.setItem("interiorImageURLEdit" + index, url)
    }

    setImageExteriorURLEdit = (url, index) => {
        localStorage.setItem("exteriorImageURLEdit" + index, url)
    }

    //////////////////////////////////////////////////////

    render() {

        console.log(this.props.exteriorImagesFileNameLength, " :exteriorImagesFileNameLength")
        return (

            <div>

                {this.state.redirect}

                <SnackBar className={classes.SnackBar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={
                        <span id="message-id">
                            {this.state.snackbarMsg}
                        </span>}
                />

                <Modal isOpen={this.state.editCarModalIsOpen}
                    className="modal-dialog-centered" toggle={this.editCarToggleModal}>

                    <ModalHeader
                        style={{ borderBottom: "0.5px solid rgba(169, 169, 169, .5)", height: "70px" }}
                        cssModule={{ 'modal-title': 'w-100 text-center' }}
                        className={classes.modalHeader}>

                        <p className="modal-title" style={{ fontSize: "30px", textDecoration: "underline" }}>Edit</p>

                    </ModalHeader>

                    <ModalBody className="container" style={{ overflowY: "scroll", height: "250px" }} >

                        <label style={{ display: "block" }}>Name: </label>
                        <input type="text" className="ml-2" id="carNameEdit" style={{ display: "block" }}
                            value={this.props.carNameEdit} onChange={(e) => this.props.onSetNewCarName(e.target.value)} />

                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        <label style={{ display: "block", marginTop: "2px" }}>Current Car Img: </label>

                        <img src={this.props.carImg} alt="img" width="70px" height="70px" style={{ display: "block", marginTop: "2px" }} />

                        <label style={{ display: "block", marginTop: "2px" }}>Edit Car Img: </label>
                        <input type="file" style={{ marginLeft: "10px", display: "block" }} onChange={e => this.handleChangeImg(e)} />


                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />

                        <label style={{ display: "block", marginTop: "5px" }}>Price Perday: </label>
                        <input type="text" className="ml-2" id="pricePerdayEdit" style={{ display: "block" }}
                            value={this.props.pricePerdayEdit} onChange={(e) => this.props.onSetNewPricePerday(e.target.value)} />

                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        <label style={{ display: "block", marginTop: "5px" }}>Body Type: </label>
                        <input type="text" className="ml-2" id="bodyTypeEdit" style={{ display: "block" }}
                            value={this.props.bodyTypeEdit} onChange={(e) => this.props.onSetNewBodyType(e.target.value)} />

                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        <label style={{ display: "block", marginTop: "5px" }}>Class: </label>
                        <input type="text" className="ml-2" id="classEdit" style={{ display: "block" }}
                            value={this.props.classEdit} onChange={(e) => this.props.onSetNewClass(e.target.value)} />

                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        <label style={{ display: "block", marginTop: "5px" }}>Engine: </label>
                        <input type="text" className="ml-2" id="engineEdit" style={{ display: "block" }}
                            value={this.props.engineEdit} onChange={(e) => this.props.onSetNewEngine(e.target.value)} />


                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        <label style={{ display: "block", marginTop: "5px" }}>Horse Power: </label>
                        <input type="text" className="ml-2" id="horsePowerEdit" style={{ display: "block" }}
                            value={this.props.horsePowerEdit} onChange={(e) => this.props.onSetNewHorsePower(e.target.value)} />

                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        <label style={{ display: "block", marginTop: "5px" }}>Exterior Images: </label>

                        {
                            Object.values(this.props.exteriorImagesFileName).map((data, index) => {

                                return (
                                    <div key={index}>
                                        <button className="btn" style={{ float: "right" }} title="Remove Image"
                                            onClick={() => this.handleRemoveExteriorImage(index)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                        <div
                                            style={{ border: "0.5px solid black", marginBottom: "5px", padding: "5px" }}>
                                            <input type="text"
                                                style={{
                                                    color: "white", border: "none", width: "200px",
                                                    marginTop: "1px", backgroundColor: "black"
                                                }}
                                                value={data} disabled />
                                            <br />

                                            <img style={{ marginTop: "5px" }} src={localStorage.getItem(data + "EditCarExteriorImage")}
                                                alt="img" width="70px" height="70px" />
                                        </div>
                                    </div>);
                            })
                        }
                        <br />
                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        <label style={{ display: "block", marginTop: "5px" }}>Interior Images: </label>

                        {
                            Object.values(this.props.interiorImagesFileName).map((data, index) => {

                                return (
                                    <div key={index}>
                                        <button className="btn" style={{ float: "right" }} title="Remove Image"
                                            onClick={() => this.handleRemoveInteriorImage(index)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                        <div
                                            style={{ border: "0.5px solid black", marginBottom: "5px", padding: "5px" }}>
                                            <input type="text"
                                                style={{
                                                    color: "white", border: "none", width: "200px",
                                                    marginTop: "1px", backgroundColor: "black"
                                                }}
                                                value={data} disabled />

                                            <br />

                                            <img style={{ marginTop: "5px" }} src={localStorage.getItem(data + "EditCarInteriorImage")}
                                                alt="img" width="70px" height="70px" />

                                        </div>

                                    </div>
                                );
                            })
                        }

                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        {

                            this.state.exteriorImagesFile.map((exteriorImagesFile, index) => {

                                console.log(exteriorImagesFile)
                                return (
                                    <div key={index}>
                                        <input type="file" style={{ marginTop: "5px" }}
                                            onChange={(e) => this.handleChangeExteriorImageFile(e, index)}
                                            value={exteriorImagesFile} />

                                        <button onClick={() => this.handleRemoveExteriorImageFile(index)} >
                                            Remove
                                        </button>
                                    </div>
                                )
                            })

                        }

                        <button onClick={(e) => this.addNewExteriorImageFile(e)}
                            className="btn btn-outline-dark" style={{ marginTop: "5px" }}>
                            AddNewExteriorImageFile</button>

                        <hr style={{ display: "block", backgroundColor: 'gray', width: '60%' }} />
                        {

                            this.state.interiorImagesFile.map((interiorImagesFile, index) => {

                                console.log(interiorImagesFile)
                                return (
                                    <div key={index}>
                                        <input type="file" style={{ marginTop: "5px" }}
                                            onChange={(e) => this.handleChangeInteriorImageFile(e, index)}
                                            value={interiorImagesFile} />

                                        <button onClick={() => this.handleRemoveInteriorImageFile(index)} >
                                            Remove
                                        </button>
                                    </div>
                                )
                            })

                        }

                        <button onClick={(e) => this.addNewInteriorImageFile(e)}
                            className="btn btn-outline-dark" style={{ marginTop: "5px" }}>
                            AddNewInteriorImageFile
                        </button>

                    </ModalBody>

                    <ModalFooter>

                        <div className="alert alert-warning"
                            style={{ display: this.state.display, margin: "auto" }}>
                            <strong>{this.state.nothingToEdit}</strong>
                        </div>

                        <button type="button" className="btn btn-outline-info" onClick={this.cancelEditButton}>CANCEL</button>
                        <Button color="info" onClick={this.editHandler} disabled={this.state.isLoading}>
                            {this.state.isLoading && <i className="spinner-border spinner-border-sm" role="status"></i>}
                            {this.state.isLoading && <span> Loading...</span>}
                            {!this.state.isLoading && <span> EDIT</span>}


                        </Button>
                    </ModalFooter>

                </Modal>
                {/* //////////////////////////////////////////////// */}

                <Modal isOpen={this.state.cancelEditingModalIsOpen}

                    className="modal-dialog-centered" toggle={this.cancelEditButton}>

                    <ModalHeader>

                        <p className="modal-title" style={{ fontSize: "20px" }}>Continue without saving</p>

                    </ModalHeader>

                    <ModalBody className="container">

                        <div className="alert alert-warning">
                            <strong>Are you sure you want to leave without saving your changes?</strong>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button type="button" style={{ height: "38px", width: "65px", borderRadius: "10px", outline: "none" }}
                            onClick={this.dontContinueWithoutSavingToggleModal}>No</button>
                        <button type="button" className="btn btn-info" onClick={this.continueWithoutSavingToggleModal}>Yes</button>
                    </ModalFooter>

                </Modal>

                <button className={["mr-1", classes.editCar].join(" ")}
                    style={{ outline: "none", backgroundColor: "transparent", border: "none" }}
                    onClick={this.editCarToggleModal}>
                    Edit
                </button>

            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        carImg: state.editCarReducer.carImage,
        exteriorImagesFileName: state.editCarReducer.exteriorImagesFileName,
        exteriorImagesFileNameLength: state.editCarReducer.exteriorImagesFileNameLength,
        interiorImagesFileName: state.editCarReducer.interiorImagesFileName,
        interiorImagesFileNameLength: state.editCarReducer.interiorImagesFileNameLength,
        carName: state.editCarReducer.carName,
        carNameEdit: state.editCarReducer.carNameEdit,
        pricePerday: state.editCarReducer.pricePerday,
        pricePerdayEdit: state.editCarReducer.pricePerdayEdit,
        bodyType: state.editCarReducer.bodyType,
        bodyTypeEdit: state.editCarReducer.bodyTypeEdit,
        class: state.editCarReducer.class,
        classEdit: state.editCarReducer.classEdit,
        engine: state.editCarReducer.engine,
        engineEdit: state.editCarReducer.engineEdit,
        horsePower: state.editCarReducer.horsePower,
        horsePowerEdit: state.editCarReducer.horsePowerEdit
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEditCar: () => dispatch(editCarActions.editCarInit()),
        onEditInteriorImagesFileName: (newInteriorImages) => dispatch(editCarActions.deleteInteriorImage(newInteriorImages)),
        onSetNewInteriorImagesFileNameLength: (newInteriorImagesFileNameLength) => dispatch(editCarActions.newInteriorImagesFileNameLength(newInteriorImagesFileNameLength)),
        onUpdateInteriorImagesArray: (interiorImagesFileName) => dispatch(editCarActions.updateInteriorImagesInFirebase(interiorImagesFileName)),
        onEditExteriorImagesFileName: (newExteriorImages) => dispatch(editCarActions.deleteExteriorImage(newExteriorImages)),
        onSetNewExteriorImagesFileNameLength: (newExteriorImagesFileNameLength) => dispatch(editCarActions.newExteriorImagesFileNameLength(newExteriorImagesFileNameLength)),
        onUpdateExteriorImagesArray: (exteriorImagesFileName) => dispatch(editCarActions.updateExteriorImagesInFirebase(exteriorImagesFileName)),
        onSetNewCarName: (newCarName) => dispatch(editCarActions.setNewCarName(newCarName)),
        onUpdateCarName: (carName) => dispatch(editCarActions.updateCarNameInFirebase(carName)),
        onSetNewPricePerday: (newPricePerday) => dispatch(editCarActions.setNewPricePerday(newPricePerday)),
        onUpdatePricePerday: (pricePerday) => dispatch(editCarActions.updatePricePerdayInFirebase(pricePerday)),
        onSetNewBodyType: (newBodyType) => dispatch(editCarActions.setNewBodyType(newBodyType)),
        onUpdateBodyType: (bodyType) => dispatch(editCarActions.updateBodyTypeInFirebase(bodyType)),
        onSetNewClass: (newClass) => dispatch(editCarActions.setNewClass(newClass)),
        onUpdateClass: (newClass) => dispatch(editCarActions.updateClassInFirebase(newClass)),
        onSetNewEngine: (newEngine) => dispatch(editCarActions.setNewEngine(newEngine)),
        onUpdateEngine: (engine) => dispatch(editCarActions.updateEngineInFirebase(engine)),
        onSetNewHorsePower: (newHorsePower) => dispatch(editCarActions.setNewHorsePower(newHorsePower)),
        onUpdateHorsePower: (horsePower) => dispatch(editCarActions.updateHorsePowerInFirebase(horsePower))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCar);