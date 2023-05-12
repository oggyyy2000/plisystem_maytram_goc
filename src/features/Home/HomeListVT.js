import React from "react";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import itemIcon from "../../assets/images/logo.png";

import axios from "axios";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/types";
import { MissionId, VTInfo } from "../../redux/selectors";

import "./css/HomeListVT.css";

function HomeListVT() {
  const [missionData, setMissionData] = useState();
  const dispatch = useDispatch();
  const missionId = useSelector(MissionId);
  const urlhomePageView = process.env.REACT_APP_API_URL + "homepageapiview/";

  useEffect(() => {
    missionId &&
      axios
        .get(urlhomePageView)
        .then((res) => {
          setMissionData(
            res.data.data.find((id) => id.schedule_id === missionId)
          );
        })
        .catch((err) => {
          console.log(err);
        });
  }, [missionId]);

  useEffect(() => {
    if (missionData) {
      const supervisionRes = Object.keys(missionData.supervision_results);
      dispatch({
        type: actions.VTInfo,
        data: supervisionRes[0],
      });
    }
  }, [missionData]);

  function renderVT() {
    return Object.keys(missionData.supervision_results).map((item) => {
      let error = false;
      function handleListVTClick() {
        dispatch({
          type: actions.VTInfo,
          data: missionData.supervision_results[item],
        });
      }
      Object.keys(missionData.supervision_results[item]).forEach((item2) => {
        // console.log(missionData.supervision_results[item][item2]);
        if (missionData.supervision_results[item][item2].length > 0) {
          error = true;
        }
      });
      return (
        <>
          <div
            className={`home-listVT-item ${error == true ? "error" : ""}`}
            onClick={handleListVTClick}
          >
            {error == true ? (
              <CancelIcon
                fontSize="small"
                color="error"
                style={{ float: "right" }}
              />
            ) : (
              <CheckCircleIcon
                fontSize="small"
                color="success"
                style={{ float: "right" }}
              />
            )}
            <img src={itemIcon} style={{ width: "40px", height: "40px" }} />
            {item}
          </div>
        </>
      );
    });
  }

  return (
    <>
      <div className="home-listVT-container">
        {missionData && missionData.supervision_results && renderVT()}
      </div>
    </>
  );
}

export default HomeListVT;
