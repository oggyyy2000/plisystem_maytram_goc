import React from "react";
import Slider from "react-slick";
import img4 from "../../assets/images/anh4.png";

import "./css/HomeImageSlider.css";

const imgList = [img4, img4, img4, img4];

function HomeImageSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* Slider 1 */}
      <div style={{ margin: "1rem 0 0 0.625rem" }}>
        <Slider {...settings}>
          {imgList.map((img) => {
            return (
              <>
                <div
                  style={{
                    padding: "1px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`${img}`}
                    alt="img"
                    style={{ maxWidth: "537px", maxHeight: "272px" }}
                  />
                </div>
              </>
            );
          })}
        </Slider>
      </div>

      {/* Slider 2 */}
      <div style={{ margin: "3rem 0 0 0.625rem" }}>
        <Slider {...settings}>
          {imgList.map((img) => {
            return (
              <>
                <div
                  style={{
                    padding: "1px",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={`${img}`}
                    alt="img"
                    style={{ maxWidth: "561px", maxHeight: "272px" }}
                  />
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    </>
  );
}

export default HomeImageSlider;
