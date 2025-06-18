/* eslint-disable react/prop-types */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Slider({
  items,
  className,
  responsiveConfig,

}) {
    
  return (
    <Carousel responsive={responsiveConfig} infinite={true}>
      {Object.values(items).map((item, index)=>(
        <div key={index} className={className}>
          {item}
        </div>
      ))}
    </Carousel>
  )
}

export default Slider
