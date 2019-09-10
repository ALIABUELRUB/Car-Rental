import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

// import NexonInterior1 from '../../../assets/images/nexonInteriorImages1.png';
// import NexonInterior2 from '../../../assets/images/nexonInteriorImages2.png';
// import NexonInterior3 from '../../../assets/images/nexonInteriorImages3.jpeg';
// import NexonInterior4 from '../../../assets/images/nexonInteriorImages4.png';
// import NexonInterior5 from '../../../assets/images/nexonInteriorImages5.jpg';
// import NexonInterior6 from '../../../assets/images/nexonInteriorImages6.jpg';

const interiorImages = (props) => {

    return (

        <div>

            <Carousel showArrows={true} autoPlay={false} infiniteLoop={true}
                showThumbs={false} showStatus={true} dynamicHeight
                showIndicators={false}
                stopOnHover={true} useKeyboardArrows={true}
            >
                {
                    props.interiorImages.map((interiorImage, index) => {
                        return (<img src={interiorImage} alt="NexonExteriorImage2" key={index}
                            height="280px" />);
                    })
                }
            </Carousel>

        </div>


    );

}

export default interiorImages;
