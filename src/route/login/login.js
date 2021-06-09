import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import { checkPhoneNumber } from "library/mobile";
import Button from "component/button";
import loginImage from "assets/images/login.png";
import { useHistory } from "react-router-dom";
import { numEn } from "library/helper";

export default function () {
  const { session, setSession, setSetting } = useStorage();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();

  const onChange = (name, value) => {
    setSession({ [name]: numEn(value) });
  };

  const onSubmit = (e) => {
    const { phone } = session;
    e.preventDefault();
    if (checkPhoneNumber(phone)) {
      setError(null);
      setLoading(true);
      post("login", { phone }).then((data) => {
        setLoading(false);
        if (data.success) {
          onChange("type", data.success.type);
          history.push("/verify");
        } else if (data.error) {
          setError(data.error);
        }
      });
    } else {
      setError("invalidPhoneNumber");
    }
  };

  return (
    <div className="login">
      <div className="row">
        <div className="col py-4 px-2">
          <h6 className="col text-center px-2">{t("loginText")}</h6>
          <form className="m-4" autoComplete="off" onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                {t("phoneNumber")}
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="phone"
                maxLength={11}
                value={session?.phone}
                onChange={(e) => onChange("phone", e.target.value)}
              />
              {!!error && (
                <div className="alert alert-warning mt-3">{t(error)}</div>
              )}
            </div>
            <div className="d-grid gap-2 mt-5">
              <Button className="btn btn-danger btn-red" loading={loading}>
                {t("getsms")}
              </Button>
            </div>
          </form>
        </div>
        <div
          className="col d-none d-sm-block image-background"
          style={{ backgroundImage: "url(" + loginImage + ")" }}
        ></div>
      </div>
    </div>
  );
}
