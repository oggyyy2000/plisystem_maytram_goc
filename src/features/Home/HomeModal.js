import * as React from "react";
import { useState, useEffect } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "80vh",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  pr: 0,
  overflowY: "auto",
};

export default function TransitionsModal({ schedule_id }) {
  const [open, setOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [imgList2, setImgList2] = useState([]);
  console.log(imgList2);
  const VTdetail = useSelector(VTInfo);
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

  const handleSelect = () => {
    setSelectAll(!selectAll)
  }

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
            {/* <label for="choose-all">Select All: </label>
            <input type="checkbox" id="choose-all" onClick={handleSelect} />  */}
            {imgList2.map((img) => {
              return (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <label for={`choose-img-${img}`}>
                      <img
                        src={`${img}`}
                        alt="img"
                        style={{ maxWidth: "1000px", maxHeight: "272px" }}
                      />
                    </label>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <input
                        id={`choose-img-${img}`}
                        type="checkbox"
                        // checked={selectAll}
                        value={img}
                        style={{ height: "50px", width: "50px" }}
                        onChange={handleCheck}
                      />
                    </div>
                  </div>
                </>
              );
            })}
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
