import React from "react";
import { useState, useEffect } from "react";

import { Button } from "@mui/material";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import "./css/FlightRoute.css";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloseIcon from "@mui/icons-material/Close";
import img1 from "../../assets/images/anh4.png";
import FlightRoutreDefectList from "./FlightRouteDefectList";
import FlightRouteInMission from "./FlightRouteInMission";

function FlightRouteMap() {
  // const types = ["Bản đồ", "Vệ tinh"];
  const [typeMap, setTypeMap] = useState("roadmap");
  const center = {
    lat: 21.028511,
    lng: 105.804817,
  };
  const wsUrl = process.env.REACT_APP_WS_URL;

  const sentData = {
    schedule_id: "c3a2505a-a711-4698-870e-7276c71470c5",
    implementation_date: "2023-05-12",
    supervision_results:
      "E:/AAA_Powerline_Project/Powerline_UAV_Server/Supervision_Database/T87/2023-05-12/supervision_results/",
    lastest_time_update_data: "7h01p",
    powerline_id: "T87",
    vid_save_path:
      "E:/AAA_Powerline_Project/Powerline_UAV_Server/Supervision_Database/T87/2023-05-12/supervision_offline_datas/DJI_0701.MP4",
    srt_save_path:
      "E:/AAA_Powerline_Project/Powerline_UAV_Server/Supervision_Database/T87/2023-05-12/supervision_offline_datas/DJI_0701.SRT",
    results_save_path:
      "E:/AAA_Powerline_Project/Powerline_UAV_Server/Supervision_Database/T87/2023-05-12/supervision_results/7h01p/",
  };

  useEffect(() => {
    const ws = new WebSocket(wsUrl);

    ws.addEventListener("open", (event) => {
      ws.send(JSON.stringify(sentData));
      console.log("Connected to server");
    });

    ws.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
    });

    ws.addEventListener("close", () => {
      console.log("Disconnected from server");
    });

    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    return () => {
      ws.close();
    };
  }, []);

  const handleChangeMapType = (event) => {
    if (event.target.value == "Vệ tinh") {
      setTypeMap("satellite");
      if (typeMap == "satellite") {
        setTypeMap("roadmap");
      }
    }
  };

  const handleAddMission = () => {
    return <></>;
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxTvKumZ34dP0Qf_veNQoliDMC5GgrblM",
  });

  if (!isLoaded) return <div>...Loading</div>;

  return (
    <>
      <div style={{ height: "90.7vh" }}>
        <div id="flightroute-btn-container">
          <button
            className={`flightroute-btn-change-maptype ${
              typeMap == "satellite" ? "bold-text" : ""
            }`}
            value={"Vệ tinh"}
            onClick={handleChangeMapType}
          >
            Vệ tinh
          </button>

          <Button
            className="flightroute-btn-addmission"
            variant="contained"
            onClick={handleAddMission}
          >
            flight
            <FlightTakeoffIcon />
          </Button>
        </div>
        
        <FlightRoutreDefectList />
        <FlightRouteInMission />
        <GoogleMap
          mapContainerClassName="flightroute-google-map"
          center={center}
          zoom={10}
          mapTypeId={typeMap}
          options={{ zoomControl: false }}
        ></GoogleMap>
      </div>
    </>
  );
}

export default FlightRouteMap;
