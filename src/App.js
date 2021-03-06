import React, { useState, useEffect } from "react";
import { withRouter, useLocation } from "react-router-dom";
import "assets/styles/app.css";
import AppRoutes from "Routes";
import RightSidebar from "component/rightSidebar";
import LeftSidebar from "component/leftSidebar";
import useStorage from "reducer";

const App = (props) => {
  const { setSetting } = useStorage();
  const [fullScreen, setFullscreen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const body = document.querySelector("body");
    body.classList.add("rtl");
    // body.classList.remove("rtl");
    // i18n.changeLanguage("en");
    window.addEventListener("message", (event) => {
      console.log(event?.data?.login);
      if (event?.data?.login) {
        // setSetting(null);
      }
    });
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fullPageLayoutRoutes = ["/login", "/verify", "/"];
    setFullscreen(fullPageLayoutRoutes.includes(location.pathname));
  }, [location]);

  return !fullScreen ? (
    <div className="root">
      <RightSidebar />
      <div className={"page"}>
        <AppRoutes />
      </div>
      <LeftSidebar />
    </div>
  ) : (
    <div className={"fullScreen"}>
      <AppRoutes />
    </div>
  );
};

export default withRouter(App);
