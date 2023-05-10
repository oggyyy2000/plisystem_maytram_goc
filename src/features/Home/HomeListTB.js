import React from "react";
import { Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import axios from "axios";

import "./css/HomeListTB.css";

function HomeListTB() {

  /*.useEffect(() => {
    axios
      .get(urlhomePageView)
      .then((res) => {
        // console.log(res.data.data.find((el) => el.schedule_id == missionId));
        // console.log(missionId);
        setMissionData(res.data.data.find((id) => id.schedule_id == missionId));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [missionId]);*/

  return (
    <>
      <Grid item xs={12} className="home-list-TB-container error">
        <div>
          <div className="home-list-TB-title">CTH</div>
          <div className="home-list-TB-content">
            <div>
              <Button variant="outlined">details</Button>
            </div>
            <div className="home-list-TB-content-icon">
              <CancelIcon fontSize="large" color="error" />
            </div>
          </div>
        </div>
      </Grid>
      {/* -------------------------------------------------- */}
      <Grid item xs={12} className="home-list-TB-container normal">
        <div>
          <div className="home-list-TB-title">DAY DIEN</div>
          <div className="home-list-TB-content">
            <div>
              <Button variant="outlined">details</Button>
            </div>
            <div className="home-list-TB-content-icon">
              <CheckCircleIcon fontSize="large" color="success" />
            </div>
          </div>
        </div>
      </Grid>
      {/* -------------------------------------------------- */}
      <Grid item xs={12} className="home-list-TB-container normal">
        <div>
          <div className="home-list-TB-title">DAY DIEN</div>
          <div className="home-list-TB-content">
            <div>
              <Button variant="outlined">details</Button>
            </div>
            <div className="home-list-TB-content-icon">
              <CheckCircleIcon fontSize="large" color="success" />
            </div>
          </div>
        </div>
      </Grid>
      {/* -------------------------------------------------- */}
      <Grid item xs={12} className="home-list-TB-container normal">
        <div>
          <div className="home-list-TB-title">DAY DIEN</div>
          <div className="home-list-TB-content">
            <div>
              <Button variant="outlined">details</Button>
            </div>
            <div className="home-list-TB-content-icon">
              <CheckCircleIcon fontSize="large" color="success" />
            </div>
          </div>
        </div>
      </Grid>
      {/* -------------------------------------------------- */}
      <Grid item xs={12} className="home-list-TB-container normal">
        <div>
          <div className="home-list-TB-title">DAY DIEN</div>
          <div className="home-list-TB-content">
            <div>
              <Button variant="outlined">details</Button>
            </div>
            <div className="home-list-TB-content-icon">
              <CheckCircleIcon fontSize="large" color="success" />
            </div>
          </div>
        </div>
      </Grid>
      {/* -------------------------------------------------- */}
      <Grid item xs={12} className="home-list-TB-container normal">
        <div>
          <div className="home-list-TB-title">DAY DIEN</div>
          <div className="home-list-TB-content">
            <div>
              <Button variant="outlined">details</Button>
            </div>
            <div className="home-list-TB-content-icon">
              <CheckCircleIcon fontSize="large" color="success" />
            </div>
          </div>
        </div>
      </Grid>
      
    </>
  );
}

export default HomeListTB;
