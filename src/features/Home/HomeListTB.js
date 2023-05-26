import React from "react";
import { Grid, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import { useSelector } from "react-redux";
import { VTInfo } from "../../redux/selectors";

import "./css/HomeListTB.css";

function HomeListTB() {
  const VTdetail = useSelector(VTInfo);
  // console.log(VTdetail);

  function renderTB() {
    // return VTdetail.map((item) => {
    //   let error = false;
    //   let TBtitle = [];
    //   Object.keys(item).map((TB) => {
    //     TBtitle.push(TB);
    //   });

    return (
      <>
        {Object.keys(VTdetail.data).map((nameTB) => {
          console.log(typeof VTdetail.data[nameTB]);
          var error = false;
          if (VTdetail.data[nameTB].length > 0) {
            error = true;
          }
          if(typeof VTdetail.data[nameTB] !== "string")
          {return (
            <>
              <Grid
                item
                xs={12}
                className={`home-list-TB-container normal ${
                  error ? "error" : ""
                }`}
              >
                <div className="home-list-TB-title">{nameTB}</div>
                <div className="home-list-TB-content">
                  <div>
                    <Button variant="outlined">details</Button>
                  </div>
                  <div className="home-list-TB-content-icon">
                    {error == true ? (
                      <CancelIcon
                        fontSize="large"
                        color="error"
                        style={{ float: "right" }}
                      />
                    ) : (
                      <CheckCircleIcon
                        fontSize="large"
                        color="success"
                        style={{ float: "right" }}
                      />
                    )}
                  </div>
                </div>
              </Grid>
            </>
          );} else {return <>No data !</>}
        })}
      </>
    );
    // });
  }

  return (
    <>
      {JSON.stringify(VTdetail) !== "{}" && renderTB()}
      {/* -------------------------------------------------- */}
      {/* <Grid item xs={12} className="home-list-TB-container normal">
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
      </Grid> */}
    </>
  );
}

export default HomeListTB;
