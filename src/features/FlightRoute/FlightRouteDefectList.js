import React from "react";
import "./css/FlightRoutreDefectList.css";

function FlightRoutreDefectList() {
  return (
    <>
      <div className="flightroute-left-panel">
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
    </>
  );
}

export default FlightRoutreDefectList;
