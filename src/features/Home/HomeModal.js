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
import CloseIcon from "@mui/icons-material/Close";
import "./css/HomeModal.css";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";
import { Grid } from "@mui/material";

export default function HomeModal({ schedule_id }) {
  const [open, setOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [checked, setChecked] = useState([]);
  const [imgList2, setImgList2] = useState([]);
  const [timeFlyStart, setTimeFlyStart] = useState([]);
  const [chooseTime, setChooseTime] = useState("");
  const [videoLink, setVideoLink] = useState("");
  // console.log(imgList2);
  const VTdetail = useSelector(VTInfo);
  console.log(schedule_id);
  const urlViewData =
    process.env.REACT_APP_API_URL +
    "supervisionschedules/?schedule_id=" +
    schedule_id;
  const urlPostFlightData = process.env.REACT_APP_API_URL + "flightdatas/";

  useEffect(() => {
    if (open === true) {
      axios
        .get(urlViewData)
        .then((res) => {
          // console.log(Object.keys(res.data.data)[0]);
          setTimeFlyStart(Object.keys(res.data.data));
          // setChooseTime(Object.keys(res.data.data)[0])
          if (chooseTime !== "") {
            getVideo(res.data.data[chooseTime]);
            getIMG(res.data.data[chooseTime]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [open, VTdetail, videoLink, chooseTime, urlViewData]);

  const handleLabelClick = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label));
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setChecked([]);
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
      .post(urlPostFlightData, checked)
      .then((response) => {
        console.log(response);
        if (response.status === 200) alert(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function getIMG(data) {
    const imgList2 = [];
    setImgList2(imgList2);
    data.defect_datas.map((defect) => {
      return defect.defect_image.map((defectLink) => {
        return imgList2.push(defectLink);
      });
    });
  }

  const getVideo = (data) => {
    setVideoLink(process.env.REACT_APP_IMG + data.supervision_datas);
  };

  const renderListData = (timeFlyStart) => {
    return (
      <>
        {timeFlyStart.map((timeflystart) => {
          console.log(timeflystart === chooseTime);
          return (
            <>
              <div
                className={`homemodal-listdata-item ${
                  timeflystart === chooseTime ? "onclick" : ""
                }`}
                onClick={(e) => {
                  setChooseTime(e.target.innerText);
                }}
              >
                <div className="homemodal-listdataitem-title">
                  {timeflystart}
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

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
        xem dữ liệu
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
          <Box
            className="homemodal"
            sx={{
              bgcolor: "background.paper",
            }}
          >
            <Grid container className="homemodal-container" spacing={0}>
              <Grid item className="homemodal-listdata" xs={2}>
                {renderListData(timeFlyStart)}
              </Grid>
              <Grid container xs={10}>
                <Grid item className="homemodal-videodata" xs={12}>
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

                  <Button
                    className="homemodal-btn-close"
                    color="error"
                    variant="contained"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </Grid>
                <Grid item className="homemodal-imgdata" xs={12}>
                  <div className="homemodal-imgdata-container">
                    <div className="homemodal-imagelist">
                      <ImageList
                        sx={{
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
                                  className={`homemodal-imagelist-label ${
                                    selectedLabels.includes(img)
                                      ? "choosed"
                                      : ""
                                  }`}
                                  onClick={() => handleLabelClick(img)}
                                >
                                  <img
                                    src={process.env.REACT_APP_IMG + img}
                                    srcSet={process.env.REACT_APP_IMG + img}
                                    alt={img}
                                    loading="lazy"
                                    width={"100%"}
                                    height={"100%"}
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
                    <div className="homemodal-imagelist-submit">
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
