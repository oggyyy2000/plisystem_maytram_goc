import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { DefectInfo } from "../../redux/selectors";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./css/FlightRouteDefectList.css";

function FlightRoutreDefectList() {
  const [close, setClose] = useState(false);
  const defectInfo = useSelector(DefectInfo);

  function handleHidePanel() {
    setClose(true);
    if (close === true) {
      setClose(false);
    }
  }

  function handleDefectItem(defectInfo) {
    if (defectInfo.length > 0) {
      return (
        <>
          {defectInfo.map((gis1) => {
            console.log(gis1);
            return (
              <>
                <div className="flightroute-itemcard">
                  <div className="flightroute-itemcard-header">
                    <h1>Defect</h1>
                  </div>

                  <div class="flightroute-itemcard-content">
                    <p>{gis1.defect_name}: on VT8</p>
                    <p>
                      LAT: {parseFloat(gis1.defect_gis.latitude).toFixed(2)}{" "}
                      <br />
                      LNG: {parseFloat(gis1.defect_gis.longtitude).toFixed(
                        2
                      )}{" "}
                      <br />
                      ALT: {parseFloat(gis1.defect_gis.altitude).toFixed(2)}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </>
      );
    }
  }
  return (
    <>
      <div
        className={`flightroute-close-leftpanel ${
          close === true ? "onclose-btn" : ""
        }`}
      >
        <button onClick={handleHidePanel}>
          {close === true ? (
            <KeyboardArrowRightIcon />
          ) : (
            <KeyboardArrowLeftIcon />
          )}
        </button>
      </div>
      <div className={`flightroute-left-panel ${close ? "onclose-panel" : ""}`}>
        {/* <div className="flightroute-itemcard">
          <div className="flightroute-itemcard-header">
            <h1>Defect</h1>
          </div>

          <div class="flightroute-itemcard-content">
            <p>CDTT vo bat: on VT8</p>
            <p>GIS: 18.16, 28.32</p>
          </div>
        </div>
        
        <div className="flightroute-itemcard">
          <div className="flightroute-itemcard-header">
            <h1>Defect</h1>
          </div>

          <div class="flightroute-itemcard-content">
            <p>CDTT vo bat: on VT8</p>
            <p>GIS: 18.16, 28.32</p>
          </div>
        </div> */}

        {defectInfo && handleDefectItem(defectInfo)}
      </div>
    </>
  );
}

export default FlightRoutreDefectList;
