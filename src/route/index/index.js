import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import "assets/styles/index.css";
import Header from "./header";
import Slider from "./slider";
import Coins from "./coins";
import Market from "./market";
import Feature from "./feature";
import Service from "./service";
import Footer from "./footer";

export default function () {
  const [referrals, setReferrals] = useState([]);
  const {
    setting: { name, token },
  } = useStorage();

  useEffect(() => {
    // post("referrals", { token }, { cache: true }).then((res) => {
    //   if (res?.success) {
    //     setReferrals(res.success);
    //   }
    // });
  }, []);
  return (
    <div className="w-100 ">
      <Header />
      <div className="my-container">
        <div className="banner">
          <h2 className="title">صرافی کنکردکس</h2>
          <span className="divider"></span>
          <p className="subtitle">
            خرید و فروش امن بیت‌کوین و ارزهای دیجیتال به بزرگترین بازار ارز
            دیجیتال ایران بپیوندید
          </p>{" "}
        </div>
        <div className="news-slider">
          <Slider />
        </div>
      </div>
      <div className="coins-slider">
        <Coins />
      </div>
      <div className="my-container">
        <Market />
        <Feature />
        <Service />
      </div>
      <Footer />
    </div>
  );
}
