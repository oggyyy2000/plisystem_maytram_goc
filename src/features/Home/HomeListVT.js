import React from "react";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import itemIcon from "../../assets/images/logo.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { MissionId } from "../../redux/selectors";

import "./css/HomeListVT.css";

function HomeListVT() {
  const missionId = useSelector(MissionId);
  const urlhomePageView = process.env.REACT_APP_API_URL + "homepageapiview/";
  const [missionData, setMissionData] = useState([]);

  useEffect(() => {
    axios
      .get(urlhomePageView)
      .then((res) => {
        // console.log(res.data.data.find((el) => el.schedule_id == missionId));
        // console.log(missionId);
        setMissionData(res.data.data.find((id) => id.schedule_id == missionId));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [missionId]);

  // console.log(listMissionData);

  function renderVT() {
    return Object.keys(missionData.supervision_results).map((item) => {
      var error = false;
      // console.log("1:", Object.keys(missionData.supervision_results[item]))
      Object.keys(missionData.supervision_results[item]).forEach((item2) => {
        if (missionData.supervision_results[item][item2].length > 0) {
          error = true;
        }
      });
      return (
        <>
          <div
            className={`home-listVT-container ${error == true ? "error" : ""}`}
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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
        }}
      >
        {missionData && missionData.supervision_results && renderVT()}
      </div>
    </>
  );
}

export default HomeListVT;
