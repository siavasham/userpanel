import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "assets/styles/app.css";
import AppRoutes from "Routes";
import LeftSidebar from "component/leftSidebar";
import RightSidebar from "component/rightSidebar";
import useStorage from "reducer";

const App = (props) => {
  const { setSetting } = useStorage();
  const [state, setState] = useState({});
  const location = useLocation();
  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("rtl");
    // body.classList.remove("rtl");
    // i18n.changeLanguage("en");
    window.addEventListener("message", (event) => {
      if (event?.data?.login) {
        setSetting(null);
      }
    });
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fullPageLayoutRoutes = ["/login"];
  }, [location]);

  return (
    <>
      <LeftSidebar />
      <div className="page">
        <AppRoutes />
      </div>
      <RightSidebar />
    </>
  );
};

export default withRouter(App);
