import React, { useEffect } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Box } from "@mui/material";

import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { VTInfo, MissionId } from "../../redux/selectors";

// import iconMarkereror from "../../assets/images/markerIconerror.png";
import "./css/HomeMap.css";

function HomeMap() {
  const [typeMap, setTypeMap] = useState("roadmap");
  const [buttonText, setButtonText] = useState("Bản đồ");
  const [center, setCenter] = useState({
    lat: 21.007556875711494,
    lng: 105.84322259736739,
  });
  const [missionData, setMissionData] = useState({});
  const [GISlist, setGISlist] = useState([]);
  const [nameError, setNameError] = useState();
  const [activeMarker, setActiveMarker] = useState(null);
  const VTdetail = useSelector(VTInfo);
  const missionId = useSelector(MissionId);

  const urlhomePageView = process.env.REACT_APP_API_URL + "homepageapiview/";
  // const urlLocations = process.env.REACT_APP_API_URL + "powerlinelocations";

  console.log(missionData);

  function getGIS() {
    const listGIS = [];
    const errorName = [];

    // console.log(errorName);
    // console.log(listGIS);
    setGISlist(listGIS);
    setNameError(errorName);

    for (var key in VTdetail.data) {
      if (typeof VTdetail.data[key] !== "string") {
        VTdetail.data[key].forEach((item) => {
          listGIS.push(item.defect_gis);
          errorName.push(item.defect_name);
        });
      }
    }
  }

  useEffect(() => {
    getGIS();
  }, [VTdetail]);

  useEffect(() => {
    missionId &&
      axios
        .get(urlhomePageView)
        .then((res) => {
          setMissionData(
            res.data.data.find((id) => id.schedule_id === missionId)
          );
          console.log(typeof res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [missionId]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxTvKumZ34dP0Qf_veNQoliDMC5GgrblM",
  });
  if (!isLoaded) return <div>...Loading</div>;

  const handleChangeMapType = (event) => {
    setButtonText("Vệ tinh");
    if (buttonText === "Vệ tinh") {
      setButtonText("Bản đồ");
    }
    if (event.target.value === "Vệ tinh") {
      setTypeMap("satellite");
      if (typeMap === "satellite") {
        setTypeMap("roadmap");
      }
    }
  };

  const handleActiveMarker = (marker, item) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
    setCenter({ lat: item.latitude, lng: item.longtitude });
  };

  function renderMapwithAMarker(GISlist, nameError) {
    return (
      <>
        <div>
          <div id="home-btn-container">
            <button
              className={`home-btn-change-maptype`}
              value={"Vệ tinh"}
              onClick={handleChangeMapType}
            >
              {buttonText}
            </button>
          </div>
          <div className="home-map-title">
            Tuyến {missionData.powerline_id} {missionData.powerline_name}
          </div>
          <GoogleMap
            mapContainerClassName="home-google-map"
            center={center}
            zoom={12}
            mapTypeId={typeMap}
            options={{ zoomControl: false }}
            onClick={() => setActiveMarker(null)}
          >
            {GISlist.map((item, index) => {
              let iconMarker = new window.google.maps.MarkerImage(
                // "http://epsmarttech.com.vn:3000/icon/vector.png",
                "https://lh3.googleusercontent.com/pw/AM-JKLUs1eX_HbHDXCbEZIr6Zb1lRJPWjhiJk8pFAn82uOebQq77t0n41BzrLrJ8y79pxoYApFx6FznLaHG_fim_tqElBo4gmxIXatokQGC1Y7z3sC00uSoaU6qekd0bkhKGsa30h8Ze9pKx016_4v07kEtg=w1179-h943-no",
                null /* size is determined at runtime */,
                null /* origin is 0,0 */,
                null /* anchor is bottom center of the scaled image */,
                new window.google.maps.Size(25, 25)
              );
              // console.log(typeof index);
              var latitude = parseFloat(item.latitude);
              var longtitude = parseFloat(item.longtitude);
              return (
                <>
                  <MarkerF
                    key={index}
                    position={{ lat: latitude, lng: longtitude }}
                    icon={iconMarker}
                    // animation={1}
                    onClick={() => {
                      handleActiveMarker(index, item);
                    }}
                  >
                    {activeMarker === index && (
                      <InfoWindowF
                        position={{ lat: latitude, lng: longtitude }}
                      >
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
                    )}
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
        GISlist !== "[]" &&
        nameError !== "[]" &&
        renderMapwithAMarker(GISlist, nameError)}
    </>
  );
}

export default HomeMap;
