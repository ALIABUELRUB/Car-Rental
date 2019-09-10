import React from 'react'
import Honda from '../../../assets/images/Honda.jpg'
import Volkswagen from '../../../assets/images/vw.jpg'
import classes from './SpecialOffers.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import FamilyCar from '../../../assets/images/FamilyCar.jpg'
import LuxuryCar from '../../../assets/images/LuxuryCar.jpg'

const specialOffers = () => (
  <div className="container my-4 mr-9">
    <h4
      style={{
        color: 'gray',
        textDecoration: 'underline',
        textAlign: 'left',
        marginLeft: '50px',
      }}
    >
      Special Offers
    </h4>

    <div className="row ">
      <div className="col-lg-3 col-md-10 ml-5 mb-4">
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          width="100%"
          dynamicHeight
          stopOnHover={true}
          transitionTime={2000}
          interval={7000}
          showIndicators={false}
        >
          <div className={classes.container}>
            <img
              src={Honda}
              className="img-fluid mb-4"
              alt=""
              data-wow-delay="0.2s"
            />
            <div className={[classes.textBlock].join(' ')}>
              <div className={classes.TopLeft}>
                <p>from $60 per day</p>
              </div>
              <p>Medium Cars</p>
            </div>
          </div>
        </Carousel>

        <br />

        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          width="100%"
          dynamicHeight
          stopOnHover={true}
          transitionTime={2000}
          interval={7000}
          showIndicators={false}
        >
          <div className={classes.container}>
            <img
              src={Volkswagen}
              className="img-fluid mb-4"
              alt=""
              data-wow-delay="0.2s"
            />
            <div className={[classes.textBlock].join(' ')}>
              <div className={classes.TopLeft}>
                <p>from $60 per day</p>
              </div>
              <p>Small Cars</p>
            </div>
          </div>
        </Carousel>
      </div>

      <div className="col-lg-5 col-md-10 ml-5 mt-3">
        <Carousel
          showArrows={false}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          width="100%"
          dynamicHeight
          stopOnHover={true}
          transitionTime={2000}
          interval={7000}
        >
          <div className={classes.containerCarousel}>
            <img
              src={Honda}
              className="img-fluid mb-4"
              alt=""
              data-wow-delay="0.2s"
            />
            <div className={[classes.textBlockCarousel].join(' ')}>
              <div className={classes.TopLeftCarousel}>
                <p>from $60 per day</p>
              </div>
              <p>Medium Cars</p>
            </div>
          </div>

          <div className={classes.containerCarousel}>
            <img
              src={Volkswagen}
              className="img-fluid mb-4"
              alt=""
              data-wow-delay="0.5s"
            />
            <div className={[classes.textBlockCarousel].join(' ')}>
              <div className={classes.TopLeftCarousel}>
                <p>from $5 per hour</p>
              </div>
              <p>Small Cars</p>
            </div>
          </div>

          <div className={classes.containerCarousel}>
            <img
              src={FamilyCar}
              className="img-fluid mb-4"
              alt=""
              data-wow-delay="0.5s"
            />
            <div className={[classes.textBlockCarousel].join(' ')}>
              <div className={classes.TopLeftCarousel}>
                <p>from $99.9 per day</p>
              </div>
              <p>Family Cars</p>
            </div>
          </div>

          <div className={classes.containerCarousel}>
            <img
              src={LuxuryCar}
              className="img-fluid mb-4"
              alt=""
              data-wow-delay="0.5s"
            />
            <div className={[classes.textBlockCarousel].join(' ')}>
              <div className={classes.TopLeftCarousel}>
                <p>from $150 per day</p>
              </div>
              <p>Luxury and Prestige Cars</p>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  </div>

  // <div className="container-fluid" style={{ marginTop: "100px"}}>
  //     <h4 style={{color: "gray", textAlign: "center"}}>Special Offers</h4>

  //          <div className="row">

  //             <div className={"col col-lg-3 col-md-3 col-sm-3 col-xs-6"} style={{marginLeft:"300px"}}>
  //                 <img src={Honda} alt="Honda" width="100%" />

  //                 <img src={Volkswagen} alt="Volkswagen" width="100%" />
  //             </div>

  //         <div className={"col col-lg-5 col-md-3 col-sm-3 col-xs-6"} >

  //             <Carousel showArrows={false} autoPlay={true} infiniteLoop={true}
  //                 showThumbs={false} showStatus={false} width="100%" dynamicHeight
  //                 stopOnHover={false} transitionTime={2000} interval={7000}
  //                 style={{ marginTop: "50px" }}
  //             >

  //                 <div>
  //                     <img src={Honda} alt="Honda" width="50px" />
  //                 </div>
  //                 <div>
  //                     <img src={Volkswagen} alt="Volkswagen" width="100%" />

  //                 </div>
  //                 {/* <div>
  //                             <img src={Background3} alt="Background3" />

  //                         </div> */}
  //             </Carousel>

  //         </div>
  //         </div>
  //     </div>
)

export default specialOffers
