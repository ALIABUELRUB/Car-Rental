import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel'

// import Aux from '../../../hoc/Auxx/Auxx';
// import NexonExterior1 from '../../../assets/images/nexonExteriorImages1.png';
// import NexonExterior2 from '../../../assets/images/NexonExteriorImages2.jpg';
// import NexonExterior3 from '../../../assets/images/nexonExteriorImages3.png';
// import NexonExterior4 from '../../../assets/images/nexonExteriorImages4.png';
// import NexonExterior5 from '../../../assets/images/nexonExteriorImages5.png';
// import NexonExterior6 from '../../../assets/images/nexonExteriorImages6.png';

const exteriorImages = props => {
  return (
    <div>
      <Carousel
        showArrows={true}
        autoPlay={false}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={true}
        showIndicators={false}
        stopOnHover={true}
        useKeyboardArrows={true}
      >
        {props.exteriorImages.map((exteriorImage, index) => {
          return (
            <img
              src={exteriorImage}
              alt="NexonExteriorImage2"
              key={index}
              height="280px"
            />
          )
        })}
      </Carousel>
    </div>
  )
}

export default exteriorImages
