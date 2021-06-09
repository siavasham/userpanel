import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";

export default function () {
  return (
    <div class="pb-0 pt-5 mt-4 footer">
      <div class="my-container">
        <div class="row justify-content-lg-between circle-blend-right circle-danger">
          <div class="col-6 col-sm-4 col-lg-auto mb-3">
            <h5 class="text-600 mb-3 fw-bold">درباره ما</h5>
            <ul class="list-unstyled mb-md-4 mb-lg-0">
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  بلاگ
                </a>
              </li>
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  درباره ما
                </a>
              </li>
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  تماس با ما
                </a>
              </li>
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  تیم ما
                </a>
              </li>
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  اخبار
                </a>
              </li>
            </ul>
          </div>
          <div class="col-6 col-sm-4 col-lg-auto mb-3">
            <h5 class="text-600 mb-3 fw-bold">حریم خصوصی </h5>
            <ul class="list-unstyled mb-md-4 mb-lg-0">
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  قوانین و مقررات
                </a>
              </li>
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  سوالات متدول
                </a>
              </li>
              <li class="mb-2">
                <a class="text-400 text-decoration-none" href="#!">
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>
          <div class="col-9 col-sm-6 col-lg-auto mb-3">
            <h5 class="text-600 mb-3 fw-bold">مارا دنبال کنید</h5>
            <ul class="list-unstyled list-inline my-3">
              <li class="list-inline-item">
                <a class="text-decoration-none" href="#!">
                  <img
                    class="list-social-icon"
                    src={require("assets/images/facebook.svg").default}
                    alt=""
                    width="25"
                  />
                </a>
              </li>
              <li class="list-inline-item">
                <a class="text-decoration-none" href="#!">
                  <img
                    class="list-social-icon"
                    src={require("assets/images/twitter.svg").default}
                    alt=""
                    width="25"
                  />
                </a>
              </li>
              <li class="list-inline-item">
                <a class="text-decoration-none" href="#!">
                  <img
                    class="list-social-icon"
                    src={require("assets/images/linkdin.svg").default}
                    alt=""
                    width="25"
                  />
                </a>
              </li>
              <li class="list-inline-item">
                <a class="text-decoration-none" href="#!">
                  <img
                    class="list-social-icon"
                    src={require("assets/images/youtube.svg").default}
                    alt=""
                    width="25"
                  />
                </a>
              </li>
              <li class="list-inline-item">
                <a class="text-decoration-none" href="#!"></a>
              </li>
            </ul>
            <p class="fw-semi-bold mt-4 mb-3">ما را دنبال کنید</p>
          </div>
        </div>
        <hr class="text-100 mb-0" />
        <div class="row justify-content-md-between justify-content-evenly py-3">
          <div class="col-12 col-sm-8 col-md-6 col-lg-auto text-center text-md-start">
            <p class="fs--1 my-2 fw-bold">
              تمامی حقوق این سایت برای کنکردکس محفوظ است
            </p>
          </div>
          <div class="col-12 col-sm-8 col-md-6">
            <p class="fs--1 my-2 text-center text-md-end">
              {" "}
              توصعه داده شده با&nbsp;
              <svg
                class="bi bi-suit-heart-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="#EB6453"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"></path>
              </svg>
              &nbsp;توسط&nbsp;
              <a class="fw-bold text-500" href="ریا٫" target="_blank">
                سیاوش یونسی{" "}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
