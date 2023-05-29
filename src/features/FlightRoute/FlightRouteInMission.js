import React, { useState } from "react";
import Webcam from "react-webcam";

import { Dialog } from "@mui/material";
import Icon from "../../assets/images/expand-icon.png";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

import "./css/FlightRouteInMission.css";

function FlightRouteInMission() {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleHidePanel() {
    setClose(true);
    if (close === true) {
      setClose(false);
    }
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
          <div className="flightroute-expandcam-container">
            <div className="flightroute-rgbcam-expand-container">
              <div className="flightroute-rgbcam-expand-title">RGB</div>
              {WebcamComponent()}
            </div>
            <div className="flightroute-thermalcam-expand-container">
              <div className="flightroute-thermalcam-expand-title">thermal</div>
              {WebcamComponent()}
            </div>
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
      <div className={`flightroute-close-rightpanel ${close === true ? "onclose-btn-rightpanel" : ""}`}>
        <button onClick={handleHidePanel}>
          {close === true ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
      </div>
      <div className={`flightroute-right-panel ${close ? "onclose-rightpanel" : ""}`}>
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
