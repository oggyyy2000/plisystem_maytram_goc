import React from "react";
import { useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import routes from "./Routes";

function App() {
  const tabs = useRoutes(routes); // them va chinh route o file Routes

  return (
    <>
      <Navbar />
      {tabs}
    </>
  );
}

export default App;
