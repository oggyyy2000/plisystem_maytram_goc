import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FlightRoundedIcon from "@mui/icons-material/FlightRounded";

import axios from "axios";

import "./css/HomeListMission.css";

function HomeListMission() {
  const [clicked, setClicked] = useState(false);
  const [listMissionData, setListMissionData] = useState([]);
  const urlhomePageView = process.env.REACT_APP_API_URL + "homepageapiview/";

  // call API lay du lieu
  useEffect(() => {
    axios
      .get(urlhomePageView)
      .then((res) => {
        // console.log(res.data.data);
        setListMissionData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function checkClicked() {
    setClicked(true);
    if (clicked === true) {
      setClicked(false);
    }
    console.log(clicked);
  }
  return (
    <>
      <Grid
        item
        className={`homelist-container ${
          clicked === true ? "homelist-container-onclick" : ""
        }`}
        onClick={checkClicked}
      >
        <Grid item className="homelist-items-title">
          <Grid className="homelist-icon-top-right">
            <FlightRoundedIcon fontSize="large" />
          </Grid>
          <Grid item className="homelist-date-tittle">
            28-4-2023
          </Grid>
        </Grid>
        <Grid item className="homelist-content">
          <p>Last Update</p>
          <p>18h50</p>
        </Grid>
        <Grid item className="homelist-icon-bottom-right">
          <CheckCircleIcon color="success" fontSize="inherit" />
        </Grid>
      </Grid>
      {/* <Grid
        item
        className={`homelist-container ${
          clicked === true ? "homelist-container-onclick" : ""
        }`}
        onClick={checkClicked}
      >
        <Grid item className="homelist-items-title">
          <Grid className="homelist-icon-top-right">
            <FlightRoundedIcon fontSize="large" />
          </Grid>
          <Grid item className="homelist-date-tittle">
            28-4-2023
          </Grid>
        </Grid>
        <Grid item className="homelist-content">
          <p>Last Update</p>
          <p>18h50</p>
        </Grid>
        <Grid item className="homelist-icon-bottom-right">
          <CheckCircleOutlineIcon color="success" fontSize="inherit" />
        </Grid>
      </Grid>
      <Grid
        item
        className={`homelist-container ${
          clicked === true ? "homelist-container-onclick" : ""
        }`}
        onClick={checkClicked}
      >
        <Grid item className="homelist-items-title">
          <Grid className="homelist-icon-top-right">
            <FlightRoundedIcon fontSize="large" />
          </Grid>
          <Grid item className="homelist-date-tittle">
            28-4-2023
          </Grid>
        </Grid>
        <Grid item className="homelist-content">
          <p>Last Update</p>
          <p>18h50</p>
        </Grid>
        <Grid item className="homelist-icon-bottom-right">
          <CheckCircleOutlineIcon color="success" fontSize="inherit" />
        </Grid>
      </Grid> */}
    </>
  );
}

export default HomeListMission;
