import React from "react";
import img1 from "../../assets/images/anh4.png";
import "./css/FlightRouteInMission.css";

function FlightRouteInMission() {
  return (
    <>
      <div className="flightroute-right-panel">
        <div className="flightroute-tableinfo">
          <table>
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
    </>
  );
}

export default FlightRouteInMission;
