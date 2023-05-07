import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import itemIcon from "../../assets/images/logo.png"

function HomeListVT() {
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
        }}
      >
        {/* ---------------------------------------- */}
        <div
          style={{
            marginTop: " 1rem",
            marginLeft: "1rem",
            minWidth: "50px",
            minHeight: "70px",
            // border: "1px solid black",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <CheckCircleIcon
            fontSize="small"
            color="success"
            style={{ float: "right" }}
          />
          <img src={itemIcon} style={{width: "40px", height: "40px"}} />
          VT1
        </div>
        {/* ---------------------------------------- */}
        <div
          style={{
            marginTop: " 1rem",
            marginLeft: "1rem",
            minWidth: "50px",
            minHeight: "50px",
            border: "2px solid red",
            borderRadius: "8px",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <CancelIcon
            fontSize="small"
            color="error"
            style={{ float: "right" }}
          />
          <img src={itemIcon} style={{width: "40px", height: "40px"}} />
          VT2
        </div>
        {/* ---------------------------------------- */} 
      </div>
    </>
  );
}

export default HomeListVT;
