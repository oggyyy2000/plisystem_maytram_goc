import React from "react";
import { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Grid } from "@mui/material";
import "./css/FlightRoute.css";
import img1 from "../../assets/images/anh4.png";

function FlightRouteMap() {
  const types = ["roadmap", "satellite"];
  const [typeMap, setTypeMap] = useState("roadmap");

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
      <div style={{ height: "90.7vh" }}>
        <div id="flightroute-btn-container">
          {types.map((type) => {
            return (
              <button
                className={`flightroute-btn-change-maptype ${
                  type === typeMap ? "bold-text" : ""
                }`}
                value={type}
                onClick={handleChangeMapType}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="flightroute-listitem-container">
          <div className="flightroute-itemcard">
            <div className="flightroute-itemcard-header">
              <h1>Defect</h1>
            </div>

            <div class="flightroute-itemcard-content">
              <p>CDTT vo bat: on VT8</p>
              <p>GIS: 18.16, 28.32</p>
            </div>
          </div>
          {/* ------------------------------------ */}
          <div className="flightroute-itemcard">
            <div className="flightroute-itemcard-header">
              <h1>Defect</h1>
            </div>

            <div class="flightroute-itemcard-content">
              <p>CDTT vo bat: on VT8</p>
              <p>GIS: 18.16, 28.32</p>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            zIndex: 1,
            width: "31.3rem",
            height: "75vh",
            backgroundColor: "white",
            top: 150,
            right: 0,
          }}
        >
          <div style={{ width: "31.3rem", height: "15vh" }}>
            <table
              className="table-right"
              style={{ width: "100%", border: "3px solid black" }}
            >
              <tr>
                <td>VTHT: VT8_T87</td>
                <td rowSpan={2}>
                  Longtitude: <br />
                  Latitude: <br />
                  Altitude:
                </td>
              </tr>
              <tr>
                <td>FPS:</td>
              </tr>
              <tr>
                <td colSpan={2}>Process: 32/100</td>
              </tr>
              <tr>
                <td colSpan={2}>MODE: DUALDEVICE</td>
              </tr>
            </table>
          </div>
          <div>
            <img src={img1} style={{ width: "31.3rem", height: "30vh" }} />
          </div>
          <div>
            <img src={img1} style={{ width: "31.3rem", height: "30vh" }} />
          </div>
        </div>
        <GoogleMap
          mapContainerClassName="flightroute-google-map"
          center={center}
          zoom={10}
          mapTypeId={typeMap}
          options={{ zoomControl: false }}
        ></GoogleMap>
      </div>
    </>
  );
}

export default FlightRouteMap;
