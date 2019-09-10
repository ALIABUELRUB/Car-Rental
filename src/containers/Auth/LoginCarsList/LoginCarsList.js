import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from './LoginCarsList.module.css';
import Nexon from '../../../assets/images/Nexon.png';
import Corvette from '../../../assets/images/Corvette.jpg';
import Ford from '../../../assets/images/ford.png';
import Vauxhall from '../../../assets/images/vauxhall.png';
import KIA from '../../../assets/images/KIA.jpg';

export default class extends React.Component {

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
        this.forceUpdate();
    }


    render() {
        let visibleSlides = 4;

        if (window.innerWidth <= 550) {
            visibleSlides = 2.5;
        }
        if (window.innerWidth <= 320) {
            visibleSlides = 2;
        }


        const settings = {
            naturalSlideWidth: 100,
            naturalSlideHeight: 690,
            totalSlides: 5,
            interval: 10000,
            isPlaying: true,
            visibleSlides: visibleSlides,
            lockOnWindowScroll: true
        };

        return (

            <div style={{ margin: "auto" }} className={["container col-lg-9 col-md-9", classes.CarsList].join(" ")}>
                <CarouselProvider
                    {...settings}
                >
                    <ButtonBack className="ml-2">Back</ButtonBack>
                    <ButtonNext>Next</ButtonNext>
                    <Slider>
                        <Slide>

                            <button onClick={() => this.carCardIsClicked(2)} style={{ backgroundColor: "transparent", border: "none" }} disabled>
                                <div className={"card bg-white text-black"}>
                                    <div className={[classes.BorderGroove, "card-body text-center"].join(" ")}>

                                        <img src={Nexon} alt="Rental Car" width="20px" height="100px" />
                                        <p className="card-text" style={{ opacity: 0.5 }}>Nexon
                                            {window.innerWidth}
                                        </p>
                                        <hr />
                                        <pre>
                                            <p className={classes.LineThrough}>70$/DAY</p>
                                            <p className={classes.TextCardSale}>   50$/DAY</p>
                                        </pre>
                                    </div>
                                </div>
                            </button>

                        </Slide>
                        <Slide>
                            <button onClick={() => this.carCardIsClicked(2)} style={{ backgroundColor: "transparent", border: "none" }} disabled>
                                <div className={"card bg-white text-black"}>
                                    <div className={[classes.BorderGroove, "card-body text-center"].join(" ")}>

                                        <img src={Corvette} alt="Rental Car" width="100%" height="100px" />
                                        <p className="card-text" style={{ opacity: 0.5 }}>Corvette</p>
                                        <hr />
                                        <pre>
                                            <p className={classes.LineThrough}>250$/DAY</p>
                                            <p className={classes.TextCardSale}>   200$/DAY</p>
                                        </pre>
                                    </div>
                                </div>
                            </button>


                        </Slide>
                        <Slide>

                            <button onClick={() => this.carCardIsClicked(2)} style={{ backgroundColor: "transparent", border: "none" }} disabled>
                                <div className={"card bg-white text-black"}>
                                    <div className={[classes.BorderGroove, "card-body text-center"].join(" ")}>

                                        <img src={Vauxhall} alt="Rental Car" width="100%" height="100px" />
                                        <p className="card-text" style={{ opacity: 0.5 }}>Vauxhall</p>
                                        <hr />
                                        <pre>
                                            <p className={classes.LineThrough}>120$/DAY</p>
                                            <p className={classes.TextCardSale}>   90$/DAY</p>
                                        </pre>

                                    </div>
                                </div>
                            </button>

                        </Slide>
                        <Slide>

                            <button onClick={() => this.carCardIsClicked(2)} style={{ backgroundColor: "transparent", border: "none" }} disabled>
                                <div className={"card bg-white text-black"}>
                                    <div className={[classes.BorderGroove, "card-body text-center"].join(" ")}>

                                        <img src={KIA} alt="Rental Car" width="100%" height="100px" />
                                        <p className="card-text" style={{ opacity: 0.5 }}>Nexon</p>
                                        <hr />
                                        <pre>
                                            <p className={classes.LineThrough}>100$/DAY</p>
                                            <p className={classes.TextCardSale}>   80$/DAY</p>
                                        </pre>

                                    </div>
                                </div>
                            </button>

                        </Slide>
                        <Slide>

                            <button onClick={() => this.carCardIsClicked(2)} style={{ backgroundColor: "transparent", border: "none" }} disabled>
                                <div className={"card bg-white text-black"}>
                                    <div className={[classes.BorderGroove, "card-body text-center"].join(" ")}>

                                        <img src={Ford} alt="Rental Car" width="100%" height="100px" />
                                        <p className="card-text" style={{ opacity: 0.5 }}>Ford</p>
                                        <hr />
                                        <pre>
                                            <p className={classes.LineThrough}>150$/DAY</p>
                                            <p className={classes.TextCardSale}>   99.9$/DAY</p>
                                        </pre>

                                    </div>
                                </div>
                            </button>

                        </Slide>
                    </Slider>

                </CarouselProvider>
            </div>
        );
    }
}