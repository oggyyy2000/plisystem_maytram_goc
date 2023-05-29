import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

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
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import "./css/FlightRoute.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import SaveIcon from "@mui/icons-material/Save";

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

  const [tab, setTab] = useState(0);

  const center = {
    lat: 21.028511,
    lng: 105.804817,
  };

  const urlPostSchedules =
    process.env.REACT_APP_API_URL + "supervisionschedules/";


  console.log("selectedFile:", selectedFile, "SRT:", SRT, "tuyen:", tuyen, "DateDB:", DateDB)  
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
    setTuyen(null)
    setSelectedFile(null)
    setNameSelectedFile(null)
    setSRT(null)
    setNameSRT(null)
  }

  async function onChangeHandlerSRT(event) {
    var file = event.target.files[0];
    var fileSRTname = event.target.files[0].name;
    if (file) {
      setSRT(file);
      setNameSRT(fileSRTname);
    }
  }

  async function onChangeHandlerVID(event) {
    var file = event.target.files[0];
    var fileSelectedName = event.target.files[0].name;
    if (file) {
      setSelectedFile(file);
      setNameSelectedFile(fileSelectedName);
    }
  }

  function onChangeDateDB(e) {
    e.preventDefault();
    setDateDB(e.target.value);
  }

  function onChangeSelectTuyen(e) {
    setTuyen(e.target.value);
    
  }

  function handleSubmit() {
    axios
      .post({
        url: urlPostSchedules,
        data: {
          video: selectedFile,
          srt: SRT,
          data: {
            powerline_id: tuyen,
            implementation_date: DateDB,
          },
        },
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    setOpen(false);
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
                {selectedFile != null &&
                SRT != null &&
                tuyen != null 
                 ? (
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
          zoom={10}
          mapTypeId={typeMap}
          options={{ zoomControl: false, fullscreenControl: false }}
        ></GoogleMap>
      </div>
    </>
  );
}

export default FlightRouteMap;
