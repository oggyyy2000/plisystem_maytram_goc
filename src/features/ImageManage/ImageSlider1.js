import React from "react";
import Slider from "react-slick";

import img4 from "../../assets/images/anh4.png";


const imgList = [img4, img4, img4, img4, img4];

function HomeImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <>
      {/* Slider 1 */}
      <div style={{fontSize: "25px", fontWeight: "bold"}}>VT8</div>
      <Slider {...settings}>
        {imgList.map((img) => {
          return (
            <>
              <div
                style={{
                  margin: "1rem 1px 1px 1px",
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  src={`${img}`}
                  alt="img"
                  style={{ maxWidth: "450px", maxHeight: "272px" }}
                />
              </div>
            </>
          );
        })}
      </Slider>
    </>
  );
}

export default HomeImageSlider;
