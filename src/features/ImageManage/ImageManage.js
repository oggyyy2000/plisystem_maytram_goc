import React from "react";
import { Grid, Box } from "@mui/material";
import ImageSlider1 from "./ImageSlider1";
import ImageSlider2 from "./ImageSlider2";
import ImageSlider3 from "./ImageSlider3";

import "./css/ImageManage.css";

function ImageManager() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid className="img-manage-slide1" xs={12}>
            <ImageSlider1 />
          </Grid>
          <Grid className="img-manage-slide2" xs={12}>
            <ImageSlider2 />
          </Grid>
          <Grid className="img-manage-slide3" xs={12}>
            <ImageSlider3 />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ImageManager;
