import React, { useState, useEffect, useCallback } from "react";

import { Dialog, Fade } from "@mui/material";
import Icon from "../../assets/images/expand-icon.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import Webcam from "react-webcam";
import VideoJS from "./Stream";

import "./css/MainFlightInMission.css";

const MainFlightInMission = ({
  startfly,
  progress,
  currentvt,
  currentlocation,
}) => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    if (startfly) {
      setClose(true);
    }
  }, [startfly]);

  // lay cam tu uav
  const [deviceId, setDeviceId] = useState({});
  const [devices, setDevices] = useState([]);
  console.log("deviceId", deviceId);
  console.log("devices", devices);

  const handleDevices = useCallback(
    (mediaDevices) =>
      setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
    [setDevices]
  );

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices, devices]);

  const WebcamCapture = () => {
    return (
      <>
        <Webcam
          audio={false}
          videoConstraints={{ deviceId }}
          style={{ width: "100%", height: "100%", objectFit: "fill" }}
        />
      </>
    );
  };

  // test video.js
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "http://127.0.0.1:4090/stream",
        type: "video/mp4",
      },
    ],
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleHidePanel = () => {
    setClose(!close);
  };

  const zoomView = () => {
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
        >
          <div className="mainflight-expandcam-container">
            <div className="mainflight-rgbcam-expand-container">
              {devices.find(({ label }) =>
                label.includes("USB Video (534d:2109)")
              ) ? (
                WebcamCapture()
              ) : (
                <div className="mainflight-before-datareturned">
                  không có tín hiệu
                </div>
              )}
            </div>
          </div>
        </Dialog>
      </>
    );
  };

  return (
    <>
      <div
        className={`mainflight-close-rightpanel ${
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
          className={`mainflight-right-panel ${
            close ? "onclose-rightpanel" : ""
          }`}
        >
          <div className="mainflight-tableinfo">
            <table>
              <tr>
                <td>VTHT: {currentvt}</td>
                {/* <td>VTHT: </td> */}

                <td rowSpan={2}>
                  Longtitude: {parseFloat(currentlocation.longtitude)} <br />
                  Latitude: {parseFloat(currentlocation.latitude)} <br />
                  Altitude: {parseFloat(currentlocation.altitude)}
                  {/* Longtitude: <br />
                  Latitude: <br />
                  Altitude:{" "} */}
                </td>
              </tr>
              <tr>
                <td>FPS:</td>
              </tr>
              <tr>
                <td colSpan={2}>Process: {progress}</td>
              </tr>
            </table>
          </div>
          <div className="mainflight-rgbview-container">
            <div className="mainflight-rgb-expandbtn">
              <button onClick={handleClickOpen}>
                <img src={Icon} alt="Icon" height={"100%"} width={"100%"} />
              </button>
            </div>

            {devices.find(({ label }) =>
                label.includes("USB Video (534d:2109)")) ? (
              WebcamCapture()
            ) : (
              <div className="mainflight-before-datareturned">
                không có tín hiệu
              </div>
            )}
          </div>

          {zoomView()}
        </div>
      </Fade>
    </>
  );
};

export default MainFlightInMission;
