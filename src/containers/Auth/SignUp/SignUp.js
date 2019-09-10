import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Navbar, Nav, Media } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import 'react-alice-carousel/lib/alice-carousel.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { storage } from '../../../FirebaseStorage/FirebaseStorage';

import Background1 from '../../../assets/images/LoginBackground1.jpg';
import Background2 from '../../../assets/images/LoginBackground2.jpg';
import Background3 from '../../../assets/images/LoginBackground3.jpg';
import classes from './SignUp.module.css';
import Logo from '../../../assets/images/RentACarLogo2.png';
import MobileBackground1 from '../../../assets/images/mobileBackground1.jpg';
import MobileBackground2 from '../../../assets/images/mobileBackground2.jpg';
import MobileBackground3 from '../../../assets/images/mobileBackground4.jpg';


class SignUp extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        
    }

    handleChange = (e) => {

        
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleChangeImg = (e) => {
        
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }));
            localStorage.setItem("imgName", image.name);
            console.log(image);
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
       
        const { image } = {...this.state};
        const uploadTask = storage.ref('UsersImages/' + image.name).put(image)
        console.log(image.name)
        

        localStorage.setItem("firstName", this.state.firstName);
        localStorage.setItem("lastName", this.state.lastName);

        this.props.onAuth(
            this.state.email,
            this.state.password,
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJp1EyiQm3CM-IQfl85-v8CqiSY0soulk'
        );



  
    }

    render() {

        let loading = null;

        if (this.props.loading) {
            loading =  <p className="text-white text-center"><strong>Loading...</strong></p>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p className="text-danger text-center"><strong>{this.props.error.message}</strong></p>
            )
        }

        let form =
            (<div className={"card-body"}>
                {errorMessage}
                {loading}
                <div className={classes.cardHeader}>
                    <h3>Sign Up</h3>

                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className={"input-group form-group"} >

                   
                          <input type="text" id="firstName" className={"form-control"}
                        placeholder="First Name" style={{ borderRadius: "5px" }} required 
                        onChange={this.handleChange}/>
                            <pre> </pre>

                         <input type="text" id="lastName" onChange={this.handleChange}
                         className={"form-control"} placeholder="Last Name" style={{ borderRadius: "5px" }} required
                         /> 
                    </div>

                    <div className={"form-group"}>
                        <input type="email" id="email" onChange={this.handleChange}
                            className={"form-control"} placeholder="Email" required />
                    </div>

                    <div className={"form-group"}>
                        <input type="password" id="password" onChange={this.handleChange}
                            className={"form-control"} placeholder="Password" required />
                    </div>

                    <div className={"form-group"}>
                        <label>
                        <input type="file" id="img" onChange={this.handleChangeImg}
                              required />
                              </label>
                    </div>

                    <div className="form-group form-check" style={{ color: "white" }}>
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox"
                                name="remember" required /> I accept the <Link to="/">
                                <strong>Terms</strong> </Link>
                            & <Link to="/"><strong>Privacy Policy</strong></Link>
                        </label>
                    </div>

                    <button className={["btn-block btn-primary mb-2 ", classes.signupButton].join(" ")} disabled={this.props.loading}>Sign Up</button>
                    <div style={{ color: "white" }}>
                        Already have an account? <Link to="/" style={{ textDecoration: "underline" }}><strong>Login here</strong></Link>
                    </div>
                </form>


            </div>);

       

       

        return (

            <div>

                <Navbar bg="dark" expand="sm" style={{ height: "65px" }}>
                    <Navbar.Brand >

                        <Link to="/">
                            <Media tag="a" className="nav-link" href="/">
                                <img src={Logo} alt="CarLogo" height="40px" />
                            </Media>
                        </Link>

                    </Navbar.Brand>


                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ height: "33px" }} />
                    <Navbar.Collapse id="basic-navbar-nav"
                        style={{ zIndex: "200", backgroundColor: "transparent" }}>
                        <Nav className="ml-auto">
                            <div className={["d-flex justify-content-center h-100", classes.centered].join(" ")}>
                                <div className={classes.transform}>
                                    <div className={[classes.cardToggle].join(" ")}>
                                       
                                        {form}
                                    </div>
                                </div>
                            </div>

                        </Nav>

                    </Navbar.Collapse>
                </Navbar>


                <div className={[classes.containerMain].join(" ")}>

                    <Carousel showArrows={false} autoPlay={true} infiniteLoop={true}
                        showThumbs={false} showStatus={false} width="100%" dynamicHeight
                        stopOnHover={false} transitionTime={2000} interval={7000}

                    >

                        <div>
                            <picture>

                                <source media="(max-width: 900px)" srcSet={MobileBackground1} />
                                <img id="carouselImg" src={Background1} alt="Background1" />

                            </picture>
                        </div>

                        <div>
                            <picture>
                                <source media="(max-width: 900px)" srcSet={MobileBackground3} />
                                <img src={Background2} alt="Background2" />
                            </picture>
                        </div>

                        <div>
                            <picture>
                                <source media="(max-width: 900px)" srcSet={MobileBackground2} />
                                <img src={Background3} alt="Background3" />
                            </picture>
                        </div>

                    </Carousel>


                    <div className={[classes.centered, "container", classes.showLoginForm].join(" ")}>
                        <div className={"d-flex justify-content-center h-100"}>
                            <div className={classes.card}>
                                {/* {errorMessage} */}
                                {form}

                            </div>
                        </div>

                    </div>



                </div>



            </div>
        );
    }
}

const mapStateToProps = state => {
    
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        token: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, url) => dispatch(actions.auth(email, password, url))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);