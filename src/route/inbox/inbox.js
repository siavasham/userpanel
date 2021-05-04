import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import Alert from "react-bootstrap/Alert";
import useStorage from "reducer";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

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
    <div>
      <div class="card p-2 border-0">
        <div class="fc row row-cols-1 row-cols-md-3">
          <div class="col">
            <h5>{t("inbox")}</h5>
          </div>
          <div class="col">
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder={t("fastFind")}
            ></input>
          </div>
          <div class="col text-end">
            <NavDropdown title={t("viewFilter")}>
              <NavDropdown.Item href="#action/3.1">
                {t("viewAsc")}
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                {t("viewDesc")}
              </NavDropdown.Item>
            </NavDropdown>
          </div>
        </div>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-ld-3 g-4 mt-3">
        <div class="col">
          <div class="card msg-card">
            <div class="card-body">
              <div class="fbc mb-2">
                <div>{t("refId")}</div>
                <div>
                  {t("date")}:<span class="text">1400/02/15</span>
                </div>
              </div>
              <div class="fbc mb-4">
                <h5 class="text">3232323</h5>
                <div>
                  {t("time")}: <span class="text">15:35</span>
                </div>
              </div>
              <p class="card-text text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card msg-card">
            <div class="card-body">
              <div class="fbc mb-2">
                <div>{t("refId")}</div>
                <div>
                  {t("date")}:<span class="text">1400/02/15</span>
                </div>
              </div>
              <div class="fbc mb-4">
                <h5 class="text">3232323</h5>
                <div>
                  {t("time")}: <span class="text">15:35</span>
                </div>
              </div>
              <p class="card-text text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card msg-card">
            <div class="card-body">
              <div class="fbc mb-2">
                <div>{t("refId")}</div>
                <div>
                  {t("date")}:<span class="text">1400/02/15</span>
                </div>
              </div>
              <div class="fbc mb-4">
                <h5 class="text">3232323</h5>
                <div>
                  {t("time")}: <span class="text">15:35</span>
                </div>
              </div>
              <p class="card-text text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
