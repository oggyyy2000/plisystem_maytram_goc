import React from "react";
import Slider from "react-slick";
import img4 from "../../assets/images/anh4.png";

import "./css/HomeImageSlider.css";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

const imgList = [img4, img4, img4, img4];

function HomeImageSlider() {
  const VTdetail = useSelector(VTInfo);
  console.log(VTdetail.data);
  // console.log(Object.keys(VTdetail.data));

  function renderIMG() {
    return (
      <>
        {Object.keys(VTdetail.data).map((item) => {
          var listIMG = []
          VTdetail.data[item].map((item2) => {
            item2.defect_image.map((img) => {
              //lay dc link anh ra
              console.log(process.env.REACT_APP_IMG_SLIDE + `${img}`);
            });
          });
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
                //cho tam 1 link anh vi truyen thu van chua dc 
                  src={`http://epsmarttech.com.vn:8000/Supervision_Database/T87/2023-05-12/supervision_results/18h41p/defect_datas/defect_0d8340b3-eff1-11ed-a52f-ac1f6bdc63c1.jpg`}
                  alt="img"
                  style={{ maxWidth: "537px", maxHeight: "272px" }}
                />
              </div>
            </>
          );
        })}
      </>
    );
  }

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
          {JSON.stringify(VTdetail) !== "{}" && renderIMG()}
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
