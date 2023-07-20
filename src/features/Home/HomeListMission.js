import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/types";

import "./css/HomeListMission.css";
import { Button } from "@mui/material";

import FlightRoundedIcon from "@mui/icons-material/FlightRounded";
import TransitionsModal from "./HomeModal";
import HomeModalTest from "./HomeModalTest";

function HomeListMission() {
  const [clicked, setClicked] = useState("");
  const [listMissionData, setListMissionData] = useState([]);
  const dispatch = useDispatch();

  const urlhomePageView = process.env.REACT_APP_API_URL + "homepageapiview/";

  // call API lay du lieu
  useEffect(() => {
    axios
      .get(urlhomePageView)
      .then((res) => {
        // console.log(res.data.data);
        setListMissionData(res.data.data);
        handleListMissionClick(res.data.data[3].schedule_id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleListMissionClick(mission_id) {
    setClicked(mission_id);
    dispatch({ type: actions.MissionId, data: mission_id });
  }

  return (
    <>
      {/* <div
        item
        className={`homelist-container ${
          clicked === true ? "homelist-container-onclick" : ""
        }`}
        // onClick={checkClicked}
      >
        <div item className="homelist-items-title">
          <div className="homelist-icon-top-right">
            <FlightRoundedIcon fontSize="large" />
          </div>
          <div item className="homelist-date-tittle">
            28-4-2023
          </div>
        </div>
        <div item className="homelist-content">
          <div>
            <p>Last Update</p>
            18h50
          </div>
          <div
            style={{
              marginLeft: " 1.14rem",
              marginTop: "15px"
              // fontSize: "58px",
            }}
          >
            <CheckCircleIcon color="success" fontSize="inherit" /> 
            <img src={checkMark} alt="checkMark" style={{height: "80%", width: "80%"}} />
          </div>
        </div>
      </div> */}

      {listMissionData.map((listmission) => {
        return (
          <>
            <div
              item
              className={`homelist-container ${
                clicked === listmission.schedule_id
                  ? "homelist-container-onclick"
                  : ""
              }`}
              onClick={() => handleListMissionClick(listmission.schedule_id)}
            >
              <div item className="homelist-items-title">
                <div className="homelist-icon-top-right">
                  <FlightRoundedIcon fontSize="large" />
                </div>
                <div item className="homelist-date-tittle">
                  {listmission.implementation_date}
                </div>
              </div>
              <div item className="homelist-content">
                <div>
                  <p>Last Update</p>
                  {listmission.lastest_time_update_data}
                </div>
                <div item className="homelist-icon-bottom-right">
                  {/* <TransitionsModal schedule_id={listmission.schedule_id} /> */}
                  <HomeModalTest schedule_id={listmission.schedule_id}/>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default HomeListMission;
