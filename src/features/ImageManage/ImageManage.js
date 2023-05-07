import React from "react";
import { Grid, Box } from "@mui/material";
import ImageSlider1 from "./ImageSlider1";
import ImageSlider2 from "./ImageSlider2";
import ImageSlider3 from "./ImageSlider3";

function ImageManager() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            style={{
              border: "3px solid black",
              margin: "0.5rem 0 0 0",
              minHeight: "350px",
            }}
          >
            <ImageSlider1 />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "3px solid black",
              margin: "1rem 0 0 0",
              minHeight: "350px",
            }}
          >
            <ImageSlider2 />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              border: "3px solid black",
              margin: "1rem 0 0 0",
              minHeight: "350px",
            }}
          >
            <ImageSlider3 />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default ImageManager;
