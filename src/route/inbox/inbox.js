import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import NavDropdown from "react-bootstrap/NavDropdown";

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
      <div className="card p-2 border-0">
        <div className="fc row row-cols-1 row-cols-md-3">
          <div className="col">
            <h5>{t("inbox")}</h5>
          </div>
          <div className="col">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder={t("fastFind")}
            ></input>
          </div>
          <div className="col text-end">
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

      <div className="row row-cols-1 row-cols-md-2 row-cols-ld-3 g-4 mt-3">
        <div className="col">
          <div className="card msg-card">
            <div className="card-body">
              <div className="fbc mb-2">
                <div>{t("refId")}</div>
                <div>
                  {t("date")}:<span className="text">1400/02/15</span>
                </div>
              </div>
              <div className="fbc mb-4">
                <h5 className="text">3232323</h5>
                <div>
                  {t("time")}: <span className="text">15:35</span>
                </div>
              </div>
              <p className="card-text text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card msg-card">
            <div className="card-body">
              <div className="fbc mb-2">
                <div>{t("refId")}</div>
                <div>
                  {t("date")}:<span className="text">1400/02/15</span>
                </div>
              </div>
              <div className="fbc mb-4">
                <h5 className="text">3232323</h5>
                <div>
                  {t("time")}: <span className="text">15:35</span>
                </div>
              </div>
              <p className="card-text text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card msg-card">
            <div className="card-body">
              <div className="fbc mb-2">
                <div>{t("refId")}</div>
                <div>
                  {t("date")}:<span className="text">1400/02/15</span>
                </div>
              </div>
              <div className="fbc mb-4">
                <h5 className="text">3232323</h5>
                <div>
                  {t("time")}: <span className="text">15:35</span>
                </div>
              </div>
              <p className="card-text text">
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
