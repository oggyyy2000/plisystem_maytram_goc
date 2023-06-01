import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { WSContext } from "../../components/context/WSContext";

import { useDispatch } from "react-redux";
import * as actions from "../../redux/types";
import { useSelector } from "react-redux";
import { CurrentLocation, DefectInfo } from "../../redux/selectors";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  Marker,
  PolylineF,
} from "@react-google-maps/api";

import "./css/FlightRoute.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SaveIcon from "@mui/icons-material/Save";
import DroneIcon from "../../assets/images/droneiconresize.png";
import iconMarkereror from "../../assets/images/markerIconerror.png";

import FlightRoutreDefectList from "./FlightRouteDefectList";
import FlightRouteInMission from "./FlightRouteInMission";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function FlightRouteMap() {
  const [open, setOpen] = useState(false);
  const [SRT, setSRT] = useState(null);
  const [nameSRT, setNameSRT] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [nameSelectedFile, setNameSelectedFile] = useState(null);
  var dt = new Date();
  var date = `${dt
    .getFullYear()
    .toString()
    .padStart(4, "0")}-${(dt.getMonth() + 1).toString().padStart(2, "0")}-${dt
    .getDate()
    .toString()
    .padStart(2, "0")}`;
  const values = {
    someDate: date,
  };
  const [DateDB, setDateDB] = useState(date);
  const [tuyen, setTuyen] = useState();

  const [typeMap, setTypeMap] = useState("roadmap");
  const [buttonText, setButtonText] = useState("Bản đồ");
  const [zoom, setZoom] = useState(15);
  const [streetLine, setStreetLine] = useState([]);
  const dispatch = useDispatch();
  const currentLocation = useSelector(CurrentLocation);
  const defectInfo = useSelector(DefectInfo);

  const [tab, setTab] = useState(0);

  const [center, setCenter] = useState({
    lat: 21.028511,
    lng: 105.804817,
  });

  const urlPostSchedules =
    process.env.REACT_APP_API_URL + "supervisionschedules/";
  const wsUrl = process.env.REACT_APP_WS_URL;
  const { ws, connect, disconnect } = useContext(WSContext);

  useEffect(() => {
    // disconnect();
    if (open === true) {
      connect();
    } else {
      // disconnect();
    }
  }, [open]);

  useEffect(() => {
    try {
      if (!ws.current) return;
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const gis = data.data.gis;
        const defectWS = data.data.defects;

        if (gis != undefined) {
          console.log("WS", gis);
          dispatch({ type: actions.CurrentLocation, data: gis });
          // setCurrentLocation(gis);
          setCenter({
            lat: parseFloat(gis.latitude),
            lng: parseFloat(gis.longtitude),
          });
          const temppoly = [...streetLine];
          temppoly.push({
            lat: parseFloat(gis.latitude),
            lng: parseFloat(gis.longtitude),
          });
          setStreetLine(temppoly);
          setZoom(23);
          if (defectWS.length > 0) {
            // setDefectGIS(defectWS);
            dispatch({ type: actions.DefectInfo, data: defectWS });
          }
          console.log("defectInfo", defectInfo);
        }
      };
    } catch (e) {
      console.log(e);
    }
  });

  const handleChangeTabs = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeMapType = (event) => {
    setButtonText("Vệ tinh");
    if (buttonText == "Vệ tinh") {
      setButtonText("Bản đồ");
    }
    if (event.target.value == "Vệ tinh") {
      setTypeMap("satellite");
      if (typeMap == "satellite") {
        setTypeMap("roadmap");
      }
    }
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
    setTuyen(null);
    setSelectedFile(null);
    setNameSelectedFile(null);
    setSRT(null);
    setNameSRT(null);
  }

  async function onChangeHandlerSRT(event) {
    setSRT(event.target.files[0]);
    setNameSRT(event.target.files[0].name);
  }

  async function onChangeHandlerVID(event) {
    setSelectedFile(event.target.files[0]);
    setNameSelectedFile(event.target.files[0].name);
  }

  function onChangeDateDB(e) {
    e.preventDefault();
    setDateDB(e.target.value);
  }

  function onChangeSelectTuyen(e) {
    setTuyen(e.target.value);
  }

  const sendPostRequest = async (formData) => {
    try {
      const response = await axios.post(urlPostSchedules, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      sendvideo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendvideo = (data) => {
    if (!ws.current) return;
    ws.current.send(JSON.stringify(data));
    handleClose();
    // setOpen(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("srt", SRT);
    formData.append(
      "data",
      JSON.stringify({ powerline_id: tuyen, implementation_date: DateDB })
    );

    sendPostRequest(formData);
    // setOpen(false);
  }

  function renderMarkerError(defectInfo) {
    if (defectInfo.length > 0) {
      return (
        <>
          {defectInfo.map((gis1) => {
            console.log(gis1);
            return (
              <>
                <MarkerF
                  key={1}
                  position={{
                    lat: parseFloat(gis1.defect_gis.latitude),
                    lng: parseFloat(gis1.defect_gis.longtitude),
                  }}
                  icon={iconMarkereror}
                  animation={1}
                ></MarkerF>
              </>
            );
          })}
        </>
      );
    }
  }

  function AddMissionDialog() {
    return (
      <>
        <Dialog
          open={open}
          sx={{
            "& .MuiDialog-container": {
              justifyContent: "flex-start",
              alignItems: "flex-start",
            },
          }}
          PaperProps={{ sx: { top: 102, left: -18 } }}
          hideBackdrop={true}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tab}
                onChange={handleChangeTabs}
                aria-label="basic tabs example"
              >
                <Tab label="Mission" {...a11yProps(0)} />
                <Tab label="Stream" {...a11yProps(1)} />
                <div className="flightroute-dialog-icon">
                  <FlightTakeoffIcon color="primary" fontSize="large" />
                </div>
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <DialogContent>
                <DialogContentText>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    htmlFor="files"
                    startIcon={<SaveIcon />}
                  >
                    VIDEO
                    <input
                      id="files"
                      name="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      type="file"
                      onChange={(e) => onChangeHandlerVID(e)}
                    />
                  </Button>
                  {nameSelectedFile}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    component="label"
                    htmlFor="srt"
                    startIcon={<SaveIcon />}
                    style={{ marginLeft: 10 }}
                  >
                    SRT
                    <input
                      id="srt"
                      name="srt"
                      accept=".srt"
                      style={{ display: "none" }}
                      type="file"
                      onChange={(e) => onChangeHandlerSRT(e)}
                    />
                  </Button>
                  {nameSRT}
                </DialogContentText>
                <DialogContentText style={{ marginTop: "5px" }}>
                  Info:
                  <Box className="flightroute-select-date">
                    <TextField
                      id="date"
                      label="Ngày quay"
                      type="date"
                      value={DateDB}
                      defaultValue={values.someDate}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={onChangeDateDB}
                    />
                  </Box>
                  <Box className="flightroute-select-tuyen">
                    <FormControl fullWidth>
                      <InputLabel>Tên Tuyến</InputLabel>
                      <Select
                        id="route"
                        value={tuyen}
                        label="IDTuyen"
                        onChange={onChangeSelectTuyen}
                        defaultValue={""}
                      >
                        <MenuItem value={"T87"}>Mai Động-Thanh Nhàn</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                {selectedFile != null && SRT != null && tuyen != null ? (
                  <Button onClick={handleSubmit} color="primary">
                    Submit
                  </Button>
                ) : (
                  <Button disabled>Submit</Button>
                )}
              </DialogActions>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <div className="flightroute-dialogtab-stream">coming soon</div>
            </TabPanel>
          </Box>
        </Dialog>
      </>
    );
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxTvKumZ34dP0Qf_veNQoliDMC5GgrblM",
  });

  if (!isLoaded) return <div>...Loading</div>;

  return (
    <>
      <div style={{ height: "90.7vh" }}>
        <div id="flightroute-btn-container">
          <button
            className={`flightroute-btn-change-maptype `}
            value={"Vệ tinh"}
            onClick={handleChangeMapType}
          >
            {buttonText}
          </button>

          <Button
            className="flightroute-btn-addmission"
            variant="contained"
            onClick={handleClickOpen}
          >
            flight
            <FlightTakeoffIcon />
          </Button>

          {/* Modal */}
          {AddMissionDialog()}
        </div>

        <FlightRoutreDefectList />
        <FlightRouteInMission />

        <GoogleMap
          mapContainerClassName="flightroute-google-map"
          center={center}
          zoom={zoom}
          mapTypeId={typeMap}
          options={{ zoomControl: false, fullscreenControl: false }}
        >
          {currentLocation && (
            <MarkerF
              key={1}
              position={{
                lat: parseFloat(currentLocation.latitude),
                lng: parseFloat(currentLocation.longtitude),
              }}
              icon={DroneIcon}
              // animation={1}
            ></MarkerF>
          )}
          {renderMarkerError(defectInfo)}
          {streetLine && (
            <PolylineF
              path={streetLine}
              options={{
                strokeColor: "red",
                strokeOpacity: 0.75,
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
}

export default FlightRouteMap;
