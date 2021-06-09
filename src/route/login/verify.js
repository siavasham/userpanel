import React, { useState, useEffect } from "react";
import { t } from "locales";
import { post } from "library/request";
import useStorage from "reducer";
import Button from "component/button";
import loginImage from "assets/images/login.png";
import { Link, useHistory } from "react-router-dom";
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
    const { phone, code } = session;
    e.preventDefault();
    if (code.length == 5) {
      setError(null);
      setLoading(true);
      post("verify", { phone, code }).then((data) => {
        setLoading(false);
        if (data.success) {
          setSetting({ login: data.success });
        } else if (data.error) {
          setError(data.error);
        }
      });
    } else {
      setError("invalid-code");
    }
  };

  return (
    <div className="login">
      <div className="row">
        <div className="col py-4 px-2">
          <h6 className="col text-center px-2">{t("loginText")}</h6>
          <form className="m-4" autoComplete="off" onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label">{t("phoneNumber")}</label>
              <div className="f ac jb">
                <h3 className="phone-number">{session?.phone}</h3>
                <Link to="/login" className="phone-number">
                  {t("edit")}
                </Link>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="code" className="form-label">
                {t("otp")}
              </label>
              <input
                type="text"
                className="form-control text-center"
                id="code"
                maxLength={5}
                value={session?.code}
                onChange={(e) => onChange("code", e.target.value)}
              />
              {!!error && (
                <div className="alert alert-warning mt-3">{t(error)}</div>
              )}
            </div>
            {session?.type == "login" ? (
              <div className="mb-3">
                <label htmlFor="auth" className="form-label">
                  {t("googleAuth")}
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="auth"
                  maxLength={5}
                  value={session?.auth}
                  onChange={(e) => onChange("auth", e.target.value)}
                />
              </div>
            ) : (
              <div className="mb-3">
                <label htmlFor="ref" className="form-label">
                  {t("refCode")}
                </label>
                <input
                  type="text"
                  className="form-control text-center"
                  id="ref"
                  maxLength={5}
                  value={session?.ref}
                  onChange={(e) => onChange("ref", e.target.value)}
                />
              </div>
            )}
            <div className="d-grid gap-2 mt-5">
              <Button className="btn btn-danger btn-red" loading={loading}>
                {session?.type == "login" ? t("signIn") : t("signUp")}
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
