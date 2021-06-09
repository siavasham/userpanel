import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";

export default function () {
  useEffect(() => {
    // post("referrals", { token }, { cache: true }).then((res) => {
    //   if (res?.success) {
    //     setReferrals(res.success);
    //   }
    // });
  }, []);
  return (
    <section class="py-0 my-2">
      <div class="container">
        <div class="row mb-5">
          <div class="col-lg-7 col-xxl-5 mx-auto text-center py-7">
            <h5 class="fw-bold fs-3 fs-lg-5 lh-sm mb-3">خدمات ما</h5>
            <p class="mb-0">{t("kycTradingDesc")}</p>
          </div>
        </div>
        <div class="row fc mb-6">
          <div class="row f jc circle">
            <div class="col-md-4 mb-4">
              <div class="card card-bg h-100 px-4 px-md-2 px-lg-3 px-xxl-4 pt-4">
                <div class="text-center">
                  <img
                    class="mc my-2"
                    src={require("assets/images/statistics.png").default}
                    width="100"
                    alt="services"
                  />
                  <div class="card-body text-center text-md-start">
                    <h4 class="fw-bold ">امنیت</h4>
                    <p class="mt-3 mb-md-0 mb-lg-3">{t("kycTradingDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card card-bg h-100 px-4 px-md-2 px-lg-3 px-xxl-4 pt-4">
                <div class="text-center">
                  <img
                    class="mc my-2"
                    src={require("assets/images/organized.png").default}
                    width="100"
                    alt="services"
                  />
                  <div class="card-body text-center text-md-start">
                    <h4 class="fw-bold ">بلاگ</h4>
                    <p class="mt-3 mb-md-0 mb-lg-3">{t("kycTradingDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 mb-4">
              <div class="card card-bg h-100 px-4 px-md-2 px-lg-3 px-xxl-4 pt-4">
                <div class="text-center">
                  <img
                    class="mc my-2"
                    src={require("assets/images/text.png").default}
                    width="100"
                    alt="services"
                  />
                  <div class="card-body text-center text-md-start">
                    <h4 class="fw-bold ">پشتیبانی ۷/۲۴</h4>
                    <p class="mt-3 mb-md-0 mb-lg-3">{t("kycTradingDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
