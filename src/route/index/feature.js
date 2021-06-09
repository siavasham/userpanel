import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";

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
    <div class="mb-5">
      <div class="row justify-content-center mb-6">
        <div class="col-lg-6 text-center mx-auto mb-3 mb-md-5 mt-4">
          <h5 class="fw-bold fs-3 fs-lg-5 lh-sm mb-3">{t("kycTrading")}</h5>
          <p class="mb-0">{t("kycTradingDesc")}</p>
        </div>
      </div>
      <div class="row circle-blend circle-blend-right circle-cyan mb-4">
        <div class="col-md-4 mb-6">
          <div class="text-center px-lg-3">
            <div class="icon-wrapper shadow-danger">
              <div class="app-icon icon-danger">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-mail"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>
            <p class="mt-3 fw-bold">{t("kyc1")}</p>
            <p class="mb-md-0 px-xxl-6"></p>
          </div>
        </div>
        <div class="col-md-4 mb-6">
          <div class="text-center px-lg-3">
            <div class="icon-wrapper shadow-primary">
              <div class="app-icon icon-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-monitor"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>
            <p class="mt-3 fw-bold">{t("kyc2")}</p>
            <p class="mb-md-0 px-xxl-6"></p>
          </div>
        </div>
        <div class="col-md-4 mb-6">
          <div class="text-center px-lg-3">
            <div class="icon-wrapper shadow-warning">
              <div class="app-icon icon-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-book"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
            </div>
            <p class="mt-3 fw-bold">{t("kyc3")}</p>
            <p class="mb-md-0 px-xxl-6"></p>
          </div>
        </div>
        <div class="col-md-4 mb-6">
          <div class="text-center px-lg-3">
            <div class="icon-wrapper shadow-success">
              <div class="app-icon icon-success">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-tablet"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </div>
            </div>
            <p class="mt-3 fw-bold">{t("kyc4")}</p>
            <p class="mb-md-0 px-xxl-6"></p>
          </div>
        </div>
        <div class="col-md-4 mb-6">
          <div class="text-center px-lg-3">
            <div class="icon-wrapper shadow-secondary">
              <div class="app-icon icon-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-printer"
                >
                  <polyline points="6 9 6 2 18 2 18 9"></polyline>
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                  <rect x="6" y="14" width="12" height="8"></rect>
                </svg>
              </div>
            </div>
            <p class="mt-3 fw-bold">{t("kyc5")}</p>
            <p class="mb-md-0 px-xxl-6"></p>
          </div>
        </div>
        <div class="col-md-4 mb-6">
          <div class="text-center px-lg-3">
            <div class="icon-wrapper shadow-info">
              <div class="app-icon icon-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-edit-2"
                >
                  <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
              </div>
            </div>
            <p class="mt-3 fw-bold">{t("kyc6")}</p>
            <p class="mb-md-0 px-xxl-6"></p>
          </div>
        </div>
      </div>
    </div>
  );
}
