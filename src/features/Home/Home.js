import { Grid, Box } from "@mui/material";
import React from "react";
import HomeMap from "./HomeMap";
import HomeListMission from "./HomeListMission";
import HomeImageSlider from "./HomeImageSlider";
import HomeListVT from "./HomeListVT";

import "./css/Home.css";
import HomeListTB from "./HomeListTB";

function Home() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={1.7} className="home-left-panel">
            <HomeListMission />
          </Grid>
          <Grid container xs={5.3}>
            <Grid item xs={12} className="home-middle-panel-map">
              <HomeMap />
            </Grid>
            <Grid container xs={12}>
              <Grid item xs={8} className="home-middle-panel-listVT">
                <HomeListVT />
              </Grid>
              <Grid item xs={4} className="home-middle-panel-listTB">
                <HomeListTB />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} className="home-right-panel">
            <HomeImageSlider />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Home;
