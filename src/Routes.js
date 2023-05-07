import React from "react";
import Home from "./features/Home/Home";
import ImageManager from "./features/ImageManage/ImageManage";
import FlightRouteManage from "./features/FlightRoute/FlightRoute";
import Page404 from "./components/NavigateErrorTabs/Page404";
import Redirect404 from "./components/NavigateErrorTabs/Redirect404";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/Home", element: <Home /> },
  { path: "/ImageManager", element: <ImageManager /> },
  { path: "/FlightRouteManage", element: <FlightRouteManage /> },

  // failed => navigate to error tabs
  { path: "/404", element: <Page404 /> },
  { path: "*", element: <Redirect404 /> },
];

export default routes;
