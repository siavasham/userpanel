import React, { useState, useEffect } from "react";
import { t } from "locales";
import useStorage from "reducer";
import { Link } from "react-router-dom";

export default function () {
  const {
    setting: { isLoged },
  } = useStorage();

  useEffect(() => {
    // post("referrals", { token }, { cache: true }).then((res) => {
    //   if (res?.success) {
    //     setReferrals(res.success);
    //   }
    // });
  }, []);
  return (
    <nav className="navbar navbar-expand-lg navbar-light py-3 d-block navbar-app">
      <div className="container my-container">
        <a className="navbar-brand" href="index.html">
          {" "}
          <img
            className="me-3 d-inline-block"
            src="assets/img/gallery/logo.png"
            alt=""
          />
        </a>
        <div className="f g  mt-lg-0">
          <ul className="fdr navbar-nav me-auto pt-2 pt-lg-0 font-base">
            <li className="nav-item px-2">
              <a className="nav-link fw-medium active" href="#home">
                خانه
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#service">
                درباره ما
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="#feature">
                تماس با ما
              </a>
            </li>
          </ul>
          <form className="ps-lg-5">
            <Link to={isLoged ? "/dashboard" : "/login"}>
              <button
                className="btn btn-light shadow-app py-2 px-3"
                type="submit"
              >
                <span className="text-gradient fw-bold">
                  {t(isLoged ? "dashboard" : "login")}
                </span>
              </button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  );
}
