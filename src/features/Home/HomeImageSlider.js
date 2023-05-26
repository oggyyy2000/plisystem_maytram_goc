import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import img4 from "../../assets/images/anh4.png";
import noProblem from "../../assets/images/noproblem.jpg";

import "./css/HomeImageSlider.css";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

const imgList = [img4, img4, img4, img4];

function HomeImageSlider() {
  const [imgList2, setImgList2] = useState([]);
  const VTdetail = useSelector(VTInfo);
  console.log(VTdetail);

  function getIMG() {
    const imgList2 = [];
    setImgList2(imgList2);
    // console.log(imgList2);
    
    for (var keys in VTdetail.data) {
      if(typeof VTdetail.data[keys] !== "string") {
      VTdetail.data[keys].forEach((item) => {
        item.defect_image.map((list) => {
          imgList2.push(process.env.REACT_APP_IMG_SLIDE + `${list}`);
        });
      });
    }
    }}
  

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
        <Slider {...settings}>
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
