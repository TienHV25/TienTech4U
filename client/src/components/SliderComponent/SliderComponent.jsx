import React from 'react'
import Slider from 'react-slick'
import {Image} from 'antd'

const SliderComponent = ({arrImages1,arrImages2}) => {
 var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000
      };
  return (
    <Slider {...settings}>
        {arrImages1.map((image1,index) => 
        {
            const image2 = arrImages2[index]; 
            return (
              <div key={index} style={{ display: 'flex' }}>
                <Image src={image1} alt="slider1" preview={false} width="50%" height="250px" />
                <Image src={image2} alt="slider2" preview={false} width="50%" height="250px" />
              </div>
            )
        }

        )}
    </Slider>
  )
}

export default SliderComponent 