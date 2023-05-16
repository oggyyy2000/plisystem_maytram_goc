import React, { useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Box } from "@mui/material";

import { useState } from "react";
import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

import iconMarker from "../../assets/images/markerIcon.png";
import "./css/HomeMap.css";

function HomeMap() {
  const types = ["roadmap", "satellite"];
  const [typeMap, setTypeMap] = useState("roadmap");
  const [GISlist, setGISlist] = useState([]);
  const [nameError, setNameError] = useState()
  const [activeMarker, setActiveMarker] = useState(null);
  const VTdetail = useSelector(VTInfo);

  // console.log(typeof activeMarker);

  function getGIS() {
    const listGIS = [];
    const errorName = [];
    // console.log(errorName);
    // console.log(listGIS);
    setGISlist(listGIS);
    setNameError(errorName)
    for (var key in VTdetail.data) {
      VTdetail.data[key].forEach((item) => {
        listGIS.push(item.defect_gis);
        errorName.push(item.defect_name);
      });
    }
  }

  useEffect(() => {
    getGIS();
  }, [VTdetail]);

  const center = {
    lat: 21.028511,
    lng: 105.804817,
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxTvKumZ34dP0Qf_veNQoliDMC5GgrblM",
  });
  if (!isLoaded) return <div>...Loading</div>;

  const handleChangeMapType = (event) => {
    setTypeMap(event.target.value);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  function renderMapwithAMarker(GISlist, nameError) {
    return (
      <>
        <div>
          <div id="home-btn-container">
            {types.map((type) => {
              return (
                <button
                  className={`home-btn-change-maptype ${
                    type === typeMap ? "home-btn-change-maptype-bold-text" : ""
                  }`}
                  value={type}
                  onClick={handleChangeMapType}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              );
            })}
          </div>
          <div className="home-map-title">
            Hành lang tuyến T87 Mai Động-Thanh Nhàn
          </div>
          <GoogleMap
            mapContainerClassName="home-google-map"
            center={center}
            zoom={10}
            mapTypeId={typeMap}
            options={{ zoomControl: false }}
            onClick={() => setActiveMarker(null)}
          >
            {GISlist.map((item, index) => {
              // console.log(typeof index);
              var latitude = parseFloat(item.latitude);
              var longtitude = parseFloat(item.longtitude);
              return (
                <>
                  <MarkerF
                    key={index}
                    position={{ lat: latitude, lng: longtitude }}
                    icon={iconMarker}
                    animation={1}
                    onClick={() => {
                      handleActiveMarker(index);
                    }}
                  >
                    {activeMarker === index && (
                      
                      <InfoWindowF 
                      position={{ lat: latitude, lng: longtitude }}>
                        <Box
                        className={"infobox"}
                      style={{
                        color: "black",
                        width: 100,
                        wordWrap: "break-word",
                      }}
                    >
                      <p>Tên lỗi: {nameError}</p>
                      <p>
                        Tọa độ: {latitude} , {longtitude}
                      </p>
                      </Box>
                      </InfoWindowF>
                    
                    ) }
                  </MarkerF>
                </>
              );
            })}
          </GoogleMap>
        </div>
      </>
    );
  }

  return (
    <>
      {JSON.stringify(VTdetail) !== "{}" &&
        renderMapwithAMarker(GISlist, nameError)}
    </>
  );
}

export default HomeMap;
