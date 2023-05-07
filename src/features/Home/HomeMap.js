import React from "react";
import { useState } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import "./css/HomeMap.css";

function HomeMap() {
  const types = ["roadmap", "satellite"];
  const [typeMap, setTypeMap] = useState("roadmap");
  // const [styleBtn, setStyleBtn] = useState("btn-change-maptype");

  const handleChangeMapType = (event) => {
    // console.log(event.target.value);

    setTypeMap(event.target.value);
  };

  const center = {
    lat: 21.028511,
    lng: 105.804817,
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxTvKumZ34dP0Qf_veNQoliDMC5GgrblM",
  });

  if (!isLoaded) return <div>...Loading</div>;

  return (
    <>
    <div >
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
      {/* <div className="home-map-title">
        Hành lang tuyến T87 Mai Động-Thanh Nhàn
      </div> */}
      <GoogleMap
        mapContainerClassName="home-google-map"
        // mapContainerStyle={{ maxHeight: "50vh" }}
        center={center}
        zoom={10}
        mapTypeId={typeMap}
        options={{ zoomControl: false }}
      >
        <MarkerF position={{ lat: 21.028511, lng: 105.804817 }}></MarkerF>
      </GoogleMap>
      </div>
    </>
  );
}

export default HomeMap;
