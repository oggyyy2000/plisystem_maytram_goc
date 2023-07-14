import * as React from "react";
import { useState, useEffect } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./css/HomeModalTest.css";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "95%",
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  pr: 0,
  overflowY: "auto",
};

export default function HomeModalTest({ schedule_id }) {
  const [open, setOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [imgList2, setImgList2] = useState([]);
  console.log(imgList2);
  const VTdetail = useSelector(VTInfo);

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
    // dispatch({ type: actions.MissionId, data: schedule_id });
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
  };

  function getIMG() {
    const imgList2 = [];
    setImgList2(imgList2);
    // console.log(imgList2);

    for (var keys in VTdetail.data) {
      if (typeof VTdetail.data[keys] !== "string") {
        VTdetail.data[keys].forEach((item) => {
          item.defect_image.map((list) => {
            imgList2.push(process.env.REACT_APP_IMG_SLIDE + `${list}`);
          });
        });
      }
    }
  }

  useEffect(() => {
    if (open === true) {
      getIMG();
    }
  }, [open, VTdetail]);

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
            <div>
              <ImageList
                sx={{ width: "100%", height: "100%", position: "relative", overflowY: "hidden" }}
                cols={3}
              >
                {imgList2.map((img) => {
                  return (
                    <>
                      <ImageListItem key={img}>
                        <label
                          for={`choose-img-${img}`}
                          className={`homemodaltest-label ${
                            selectedLabels.includes(img) ? "choosed" : ""
                          }`}
                          onClick={() => handleLabelClick(img)}
                        >
                          <img
                            src={img}
                            srcSet={img}
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
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button variant="outlined" onClick={handleSubmit}>
                SUBMIT
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
