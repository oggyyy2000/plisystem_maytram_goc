import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import playVideo from "../../assets/images/play_video_icon.png";
import "./css/HomeModalTest.css";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 2,
  pr: 0,
  // overflowY: "auto",
};

export default function HomeModalTest({ schedule_id }) {
  const [open, setOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [checked, setChecked] = useState([]);
  const [imgList2, setImgList2] = useState([]);
  // const [errorName, setErrorName] = useState([]);
  const [timeFlyStart, setTimeFlyStart] = useState([]);
  const [chooseTime, setChooseTime] = useState("");
  const [videoLink, setVideoLink] = useState("");
  console.log(imgList2);
  const VTdetail = useSelector(VTInfo);
  console.log(chooseTime);
  const url =
    process.env.REACT_APP_API_URL +
    "supervisionschedules/?schedule_id=" +
    schedule_id;

  useEffect(() => {
    if (open === true) {
      axios
        .get(url)
        .then((res) => {
          console.log(res.data.data[chooseTime]);
          setTimeFlyStart(Object.keys(res.data.data));
          if (chooseTime != "") {
            getVideo(res.data.data[chooseTime]);
            getIMG(res.data.data[chooseTime]);
          }
          // getErrorName(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [open, VTdetail, videoLink, chooseTime]);

  const handleLabelClick = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const handleOpen = () => {
    setChecked([]);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    console.log(updatedList);
    setChecked(updatedList);
  };

  const handleSubmit = () => {
    console.log(checked);
    axios
      .post(" http://10.0.17.36:8000/flightdatas/", checked)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function getIMG(data) {
    const imgList2 = [];
    setImgList2(imgList2);
    data.defect_datas.map((defect) => {
      defect.defect_image.map((defectLink) => {
        imgList2.push(defectLink);
      });
    });
  }

  const getVideo = (data) => {
    setVideoLink(process.env.REACT_APP_IMG_SLIDE + data.supervision_datas);
  };

  // const getErrorName = (data) => {
  //   Object.keys(data).map((info) => {
  //     data[info].defect_datas.map((defect) => {
  //       setErrorName(defect.defect_name);
  //     });
  //   });
  // };

  return (
    <div>
      <Button
        style={{
          backgroundColor: "chartreuse",
          borderRadius: "10%",
          color: "white",
        }}
        onClick={handleOpen}
      >
        view datas
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid
              container
              spacing={0}
              className="box1"
              style={{ height: "100%" }}
            >
              <Grid
                item
                xs={2}
                style={{
                  height: "100%",
                  border: "1px solid black",
                  overflowY: "auto",
                }}
                className="box1.1"
              >
                {timeFlyStart.map((timeflystart) => {
                  return (
                    <>
                      <div
                        style={{
                          border: "1px solid black",
                          minHeight: "18%",
                          display: "flex",

                          cursor: "pointer",
                          fontSize: "25px",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => {
                          setChooseTime(e.target.innerText);
                        }}
                      >
                        <div style={{ width: "100%", position: "relative" }}>
                          {timeflystart}
                        </div>
                        <div
                          style={{
                            position: "absolute",
                            top: "3%",
                            left: "5%",
                          }}
                          onClick={false}
                        >
                          <img
                            src={playVideo}
                            height={"100px"}
                            width={"100px"}
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </Grid>
              <Grid container xs={10} className="box1.2">
                <Grid
                  item
                  xs={12}
                  style={{
                    height: "50%",
                    border: "1px solid black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="box1.2.1"
                >
                  <video
                    controls
                    autoPlay
                    muted
                    style={{
                      height: "350px",
                      width: "500px",
                      marginTop: "-46px",
                    }}
                    src={videoLink}
                    type="video/mp4"
                  >
                    Your browser does not support the video tag.
                  </video>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{
                    height: "50%",
                    border: "1px solid black",
                  }}
                  className="box1.2.2"
                >
                  <div style={{ height: "76%", overflowY: "auto" }}>
                    <div>
                      <ImageList
                        sx={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                          overflowY: "hidden",
                        }}
                        cols={3}
                      >
                        {imgList2.map((img) => {
                          return (
                            <>
                              <ImageListItem key={img}>
                                <label
                                  for={`choose-img-${img}`}
                                  className={`homemodaltest-label ${
                                    selectedLabels.includes(img)
                                      ? "choosed"
                                      : ""
                                  }`}
                                  onClick={() => handleLabelClick(img)}
                                >
                                  <img
                                    src={process.env.REACT_APP_IMG_SLIDE + img}
                                    srcSet={
                                      process.env.REACT_APP_IMG_SLIDE + img
                                    }
                                    alt="picture"
                                    loading="lazy"
                                    style={{ width: "100%", height: "100%" }}
                                  />
                                </label>

                                {selectedLabels.includes(img) && (
                                  <div className="checkmark"></div>
                                )}
                              </ImageListItem>

                              <input
                                id={`choose-img-${img}`}
                                type="checkbox"
                                value={img}
                                style={{
                                  display: "none",
                                }}
                                onChange={handleCheck}
                              />
                            </>
                          );
                        })}
                      </ImageList>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Button variant="outlined" onClick={handleSubmit}>
                        SUBMIT
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
