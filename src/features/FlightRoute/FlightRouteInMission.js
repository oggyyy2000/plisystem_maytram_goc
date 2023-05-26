import React, { useState } from "react";
import Webcam from "react-webcam";

import { Dialog } from "@mui/material";
import Icon from "../../assets/images/expand-icon.png";

import "./css/FlightRouteInMission.css";

function FlightRouteInMission() {
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function zoomView() {
    return (
      <>
        <Dialog
          open={open}
          onClose={handleClose}
          sx={{
            "& .MuiDialog-container": {
              justifyContent: "flex-start",
              alignItems: "flex-start",
            },
          }}
          PaperProps={{
            sx: { height: "681px", width: "1535px", maxWidth: "1535px" },
          }}
          // hideBackdrop={true}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "681px",
              overflowY: "hidden",
              
            }}
          >
            <div style={{ width: "50%", position: "relative", border: "1px solid black" }}>
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "red",
                }}
              >
                RGB
              </div>
              {WebcamComponent()}
            </div>
            <div style={{ width: "50%", position: "relative", border: "2px solid black" }}><div
                style={{
                  position: "absolute",
                  right: 0,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: "25px",
                  color: "red",
                }}
              >
                thermal
              </div>{WebcamComponent()}</div>
          </div>
        </Dialog>
      </>
    );
  }

  function WebcamComponent() {
    return (
      <>
        <Webcam className="flightroute-webcam" audio={false} />
      </>
    );
  }
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
          </table>
        </div>
        <div className="flightroute-rgbview-container">
          <div className="flightroute-rgb-title">RGB</div>
          <div className="flightroute-rgb-expandbtn">
            <button onClick={handleClickOpen}>
              <img src={Icon} height={"100%"} width={"100%"} />
            </button>
          </div>
          {WebcamComponent()}
        </div>
        <div className="flightroute-thermalview-container">
          <div className="flightroute-thermal-title">Thermal</div>
          {WebcamComponent()}
        </div>
        {zoomView()}
      </div>
    </>
  );
}

export default FlightRouteInMission;
