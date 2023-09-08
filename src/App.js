import React from "react";
import { useRoutes } from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
import NavbarTest from "./components/Navbar/NavbarTest";
import routes from "./Routes";
import WSContextProvider from "./components/context/WSContext";

function App() {
  const tabs = useRoutes(routes); // them va chinh route o file Routes

  return (
    <>
      <WSContextProvider>
        {/* <Navbar /> */}
        <NavbarTest />
        {tabs}
      </WSContextProvider>
    </>
  );
}

export default App;
