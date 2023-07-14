import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";

import { useSelector } from "react-redux";
import { CurrentLocation, CurrentVT } from "../../redux/selectors";

import { Dialog, Fade } from "@mui/material";
import Icon from "../../assets/images/expand-icon.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import "./css/FlightRouteInMission.css";

function FlightRouteInMission({ startfly }) {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);
  const currentLocation = useSelector(CurrentLocation);
  const VT = useSelector(CurrentVT);

  useEffect(() => {
    if (startfly) {
      setClose(true);
    }
  }, [startfly]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleHidePanel() {
    //setClose(true);
    // if (close === true) {
    //   setClose(false);
    // }
    setClose(!close);
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
      <div
        className={`flightroute-close-rightpanel ${
          close === true ? "onclose-btn-rightpanel" : ""
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
      <Fade in={close} timeout={1200}>
        <div
          className={`flightroute-right-panel ${
            close ? "onclose-rightpanel" : ""
          }`}
        >
          <div className="flightroute-tableinfo">
            <table>
              <tr>
                <td>VTHT: {VT}</td>
                <td rowSpan={2}>
                  Longtitude: {parseFloat(currentLocation.longtitude)} <br />
                  Latitude: {parseFloat(currentLocation.latitude)} <br />
                  Altitude: {parseFloat(currentLocation.altitude)}
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
      </Fade>
    </>
  );
}

export default FlightRouteInMission;
