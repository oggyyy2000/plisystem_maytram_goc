import React, { useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useState } from "react";
import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

import iconMarker from "../../assets/images/markerIcon.png"
import "./css/HomeMap.css";

function HomeMap() {
  const types = ["roadmap", "satellite"];
  const [typeMap, setTypeMap] = useState("roadmap");
  const [selectedMarker, setSelectedMarker] = useState();
  const [GISlist, setGISlist] = useState([]);
  const VTdetail = useSelector(VTInfo);

  console.log(selectedMarker)

  function getGIS() {
    const listGIS = [];
    console.log(listGIS);
    setGISlist(listGIS);
    for (var key in VTdetail.data) {
      VTdetail.data[key].forEach((item) => {
        listGIS.push(item.defect_gis);
      });
    }
  }

  useEffect(() => {
    getGIS();
  }, [VTdetail]);

  function renderMarker(GISlist) {
    return (
      <>
        {GISlist.map((item) => {
          var latitude = parseFloat(item.latitude);
          var longtitude = parseFloat(item.longtitude);
          return (
            <>
              <MarkerF
                position={{ lat: latitude, lng: longtitude }}
                icon={iconMarker}
                animation={2}
                // onClick={() => {
                //   setSelectedMarker(item);
                // }}
              >
                {/* {selectedMarker && (
                  <InfoWindow>
                    <h3>lat: {parseFloat(selectedMarker.latitude)}</h3>
                    <h3>lng: {parseFloat(selectedMarker.longtitude)}</h3>

                    <button
                      onClick={() => {
                        setSelectedMarker("");
                      }}
                    ></button>
                  </InfoWindow>
                )} */}
              </MarkerF>
            </>
          );
        })}
      </>
    );
  }

  const handleChangeMapType = (event) => {
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
        >
          {JSON.stringify(VTdetail) !== "{}" && renderMarker(GISlist)}
        </GoogleMap>
      </div>
    </>
  );
}

export default HomeMap;
