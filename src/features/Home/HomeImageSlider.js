import React, { useEffect, useState } from "react";
import Slider from "react-slick";
// import img4 from "../../assets/images/anh4.png";
import thermalImg1 from "../../assets/images/ThermalIMG/DJI_20230316142734_0008_T.JPG";
import thermalImg2 from "../../assets/images/ThermalIMG/DJI_20230316142754_0009_T.JPG";
import thermalImg3 from "../../assets/images/ThermalIMG/DJI_20230316143031_0011_T.JPG";
import thermalImg4 from "../../assets/images/ThermalIMG/DJI_20230316143223_0013_T.JPG";
import thermalImg5 from "../../assets/images/ThermalIMG/DJI_20230316143228_0014_T.JPG";
import thermalImg6 from "../../assets/images/ThermalIMG/DJI_20230316143231_0015_T.JPG";
import thermalImg7 from "../../assets/images/ThermalIMG/DJI_20230316143233_0016_T.JPG";
import thermalImg8 from "../../assets/images/ThermalIMG/DJI_20230316143236_0017_T.JPG";
import thermalImg9 from "../../assets/images/ThermalIMG/DJI_20230316143240_0018_T.JPG";
import thermalImg10 from "../../assets/images/ThermalIMG/DJI_20230316143324_0019_T.JPG";

import noProblem from "../../assets/images/noproblem.jpg";

import "./css/HomeImageSlider.css";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

const imgList = [
  thermalImg1,
  thermalImg2,
  thermalImg3,
  thermalImg4,
  thermalImg5,
  thermalImg6,
  thermalImg7,
  thermalImg8,
  thermalImg9,
  thermalImg10,
];

function HomeImageSlider() {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [imgList2, setImgList2] = useState([]);
  const VTdetail = useSelector(VTInfo);
  console.log(VTdetail);

  function getIMG() {
    const imgList2 = [];
    setImgList2(imgList2);
    // console.log(imgList2);

    for (var keys in VTdetail.data) {
      if (typeof VTdetail.data[keys] !== "string") {
        VTdetail.data[keys].forEach((item) => {
          item.defect_image.map((list) => {
            imgList2.push(process.env.REACT_APP_IMG_SLIDE + `${list}`);
          });
        });
      }
    }
  }

  useEffect(() => {
    getIMG();
  }, [VTdetail]);

  //co the render bang fuction nhung gap loi k the return ra slide ma tat ca anh
  //xep thanh 1 cot
  // function renderIMG() {
  //   // console.log(imgList2)
  //   return (
  //     <>
  //       {imgList2.map((img) => {
  //         return (
  //           <>
  //             <div
  //               style={{
  //                 padding: "1px",
  //                 textAlign: "center",
  //                 display: "flex",
  //                 justifyContent: "center",
  //               }}
  //             >
  //               <img
  //                 src={`${img}`}
  //                 alt="img"
  //                 style={{ maxWidth: "537px", maxHeight: "272px" }}
  //               />
  //             </div>
  //           </>
  //         );
  //       })}
  //     </>
  //   );
  // }

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
        <Slider
          {...settings}
          asNavFor={nav2}
          ref={(slider1) => setNav1(slider1)}
        >
          {JSON.stringify(VTdetail.data) !== "{}" && imgList2.length > 0 ? (
            imgList2.map((img) => {
              return (
                <>
                  <div className="home-slide">
                    <img
                      src={`${img}`}
                      alt="img"
                      style={{ maxWidth: "537px", maxHeight: "272px" }}
                    />
                  </div>
                </>
              );
            })
          ) : (
            <>
              <div className="home-slide">
                <img
                  src={noProblem}
                  alt="img"
                  style={{ maxWidth: "537px", maxHeight: "272px" }}
                />
              </div>
            </>
          )}
        </Slider>
      </div>

      {/* Slider 2 */}
      <div style={{ margin: "3rem 0 0 0.625rem" }}>
        <Slider
          {...settings}
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
        >
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
