// import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { Box, Tabs, Tab, AppBar, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../../assets/images/logo.png";

function a11yProps(index) {
  return {
    id: `nav-tabmain-${index}`,
    "aria-controls": `nav-tabmainpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <>
      <Tab
        sx={{
          color: "white",
          "&.Mui-selected": {
            color: "#fff",
          },
        }}
        icon={props.Icon}
        component={"C"}
        onClick={() => {
          props.setValue(props.index);
          if (props.href !== "visibility") props.navigate(props.href);
        }}
        {...props}
      />
    </>
  );
}

const Navbar = [
  {
    index: 0,
    ten_navbar: "Trang chủ",
    url: "/Home",
  },
  {
    index: 1,
    ten_navbar: "Quản lý đợt bay",
    url: "/FlightRouteManage",
  },
  {
    index: 2,
    ten_navbar: "Hành lang tuyến",
    url: "/PowerlineCorridor",
  },
];

export default function NavbarTest() {
  const [value, setValue] = useState(4);
  const [prevCurrentPage, setPrevCurrentPage] = useState("");

  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    var path = window.location.pathname;
    var item = Navbar.find((x) => x.url === path);
    if (item) {
      setValue(item.index);
      if (prevCurrentPage !== "") {
        if (prevCurrentPage === "/app/m3d") {
          window.location.reload();
        }
      }
      setPrevCurrentPage(path);
    }
  }, [location, prevCurrentPage]);

  // return (
  //   <>
  //     <Box sx={{ width: "100%" }}>
  //       <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
  //         <Tabs
  //           value={tab}
  //           onChange={handleChangeTabs}
  //           aria-label="basic tabs example"
  //         >
  //           <Tab label="Trang chủ" {...a11yProps(0)} />
  //           <Tab label="Quản lý đợt bay" {...a11yProps(1)} />
  //           <Tab label="Hành lang tuyến" {...a11yProps(2)} />
  //         </Tabs>
  //       </Box>
  //       <CustomTabPanel value={tab} index={0}></CustomTabPanel>
  //       <CustomTabPanel value={tab} index={1}></CustomTabPanel>
  //       <CustomTabPanel value={tab} index={2}></CustomTabPanel>
  //     </Box>
  //   </>
  // );
  return (
    <Box>
      <div>
        <AppBar
          position="static"
          style={{
            // backgroundColor: "#1976d2",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Tabs
            style={{ width: "96%" }}
            value={value}
            variant="scrollable"
            scrollButtons="auto"
          >
            <img
              src={logo}
              alt="logo"
              style={{ width: "50px", height: "50px" }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/Home"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                lineHeight: "2.6",
              }}
            >
              EPSMARTTECH
            </Typography>

            {Navbar.map((item, index) => (
              <LinkTab
                suburl={item.suburl}
                label={item.ten_navbar}
                setValue={setValue}
                index={index}
                navigate={navigate}
                href={item.url}
                icon={item.icon}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </AppBar>
      </div>
    </Box>
  );
}
